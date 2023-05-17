import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import logo from '../images/logo.png';
import avatar from '../images/avatar.svg';
import heart from '../images/heart-empty.svg';
import search from '../images/search-icon.svg';
import userIcon from '../images/user.svg';
import '../CSS/header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.userRequest = this.userRequest.bind(this);

    this.state = ({
      userImage: '',
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
        userImage: user.image,
        loading: false,
      });
    });
  }

  render() {
    const { userImage, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : (
          <div className="header">
            <div className="header-top">
              <img
                src={ logo }
                alt="Logo do Trybe Tunes"
                className="logo-header"
              />
              <img
                src={ userImage !== undefined ? userImage : avatar }
                alt="Avatar default"
                className="avatar"
              />
            </div>
            <nav className="header-bottom">
              <Link
                to="/"
                className="search-link"
                data-testid="link-to-search"
              >
                <img src={ search } alt="lupa de pesquisa" />
              </Link>
              <div className="line1" />
              <Link
                to="/favorites"
                className="favorites-link"
                data-testid="link-to-favorites"
              >
                <img src={ heart } alt="coração de favoritos" />
              </Link>
              <div className="line2" />
              <Link
                to="/profile"
                className="profile-link"
                data-testid="link-to-profile"
              >
                <img src={ userIcon } alt="avatar de perfil" />
              </Link>
            </nav>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
