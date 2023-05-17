import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import editIcont from '../images/edit_icon.svg';
import avatar from '../images/avatar.svg';
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
    console.log(userImage);
    return (
      <div className="profile">
        <div className="div-profile-picture">
          <img
            src={ userImage !== undefined ? userImage : avatar }
            alt={ userName }
            className="profile-picture"
          />
          <Link to="/profile/edit">
            <i>
              <img src={ editIcont } className="edit-icon" alt="editar" />
              <p>Editar Perfil</p>
            </i>
          </Link>
        </div>
        <div className="profile-infos">
          <h4>Nome de Usuário</h4>
          <p>{ userName }</p>
          <h4>E-mail</h4>
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
      <div className="profile-page">
        <Header />
        { loading ? <Loading /> : this.userRender() }
      </div>
    );
  }
}

export default Profile;
