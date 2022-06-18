import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import editIcont from '../images/edit_icon.png';
import '../CSS/profile.css';

class Profile extends React.Component {
  constructor() {
    super();

    this.userRequest = this.userRequest.bind(this);
    this.userRender = this.userRender.bind(this);

    this.state = ({
      userName: '',
      userEmail: '',
      userImage: '',
      userDescription: '',
      loading: false,
    });
  }

  componentDidMount() {
    this.userRequest();
  }

  async userRequest() {
    this.setState({
      loading: true,
    }, async () => {
      const user = await getUser();
      this.setState({
        userName: user.name,
        userEmail: user.email,
        userImage: user.image,
        userDescription: user.description,
        loading: false,
      });
    });
  }

  userRender() {
    const { userName, userEmail, userImage, userDescription } = this.state;
    return (
      <div className="profile">
        <div className="div-profile-picture">
          <img
            src={ userImage }
            alt={ userName }
            className="profile-picture"
            data-testid="profile-image"
          />
          <Link to="/profile/edit">
            <i>
              <img src={ editIcont } className="edit-icon" alt="editar" />
              <p>Editar perfil</p>
            </i>
          </Link>
        </div>
        <div className="profile-infos">
          <h4>Nome</h4>
          <p>{ userName }</p>
          <h4>Email</h4>
          <p>{ userEmail }</p>
          <h4>Descrição</h4>
          <p>{ userDescription }</p>
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="profile-page" data-testid="page-profile">
        <Header />
        { loading ? <Loading /> : this.userRender() }
      </div>
    );
  }
}

export default Profile;
