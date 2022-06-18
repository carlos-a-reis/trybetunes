import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import logo from '../images/logo.png';
import avatar from '../images/avatar.png';
import rectangle from '../images/rectangle.png';
import '../CSS/header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.userRequest = this.userRequest.bind(this);

    this.state = ({
      userName: '',
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
        loading: false,
      });
    });
  }

  render() {
    const { userName, loading } = this.state;
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
              <div className="user">
                <p data-testid="header-user-name">{ userName }</p>
                <img
                  src={ avatar }
                  alt="Avatar default"
                  className="avatar"
                />
                <img
                  src={ rectangle }
                  alt="Avatar default"
                  className="rectangle"
                />
              </div>
            </div>
            <nav className="header-bottom">
              <Link
                to="/search"
                className="search-link nav-link"
                data-testid="link-to-search"
              >
                Pesquisa
              </Link>
              <div className="line1" />
              <Link
                to="/favorites"
                className="favorites-link nav-link"
                data-testid="link-to-favorites"
              >
                Favoritas
              </Link>
              <div className="line2" />
              <Link
                to="/profile"
                className="profile-link nav-link"
                data-testid="link-to-profile"
              >
                Perfil
              </Link>
            </nav>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
