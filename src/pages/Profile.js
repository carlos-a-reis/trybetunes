import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

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
      <div>
        <img src={ userImage } alt={ userName } data-testid="profile-image" />
        <Link to="/profile/edit">
          <button type="button">Editar perfil</button>
        </Link>
        <h3>Nome</h3>
        <p>{ userName }</p>
        <h3>Email</h3>
        <p>{ userEmail }</p>
        <h3>Descrição</h3>
        <p>{ userDescription }</p>
      </div>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading /> : this.userRender() }
      </div>
    );
  }
}

export default Profile;
