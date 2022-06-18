import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../images/logo.png';
import '../CSS/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.inputName = this.inputName.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      userName: '',
      enableButton: true,
      loading: false,
      redirect: false,
    };
  }

  inputName({ target }) {
    const minUserName = 3;

    this.setState({
      userName: target.value,
    });

    if (target.value.length >= minUserName) {
      this.setState({
        enableButton: false,
      });
    } else {
      this.setState({
        enableButton: true,
      });
    }
  }

  async login(event) {
    event.preventDefault();
    const { userName } = this.state;

    this.setState({
      loading: true,
    });

    await createUser({ name: userName });

    this.setState({
      loading: false,
      redirect: true,
    });
  }

  render() {
    const { userName, enableButton, loading, redirect } = this.state;

    return (
      <div className="login" data-testid="page-login">
        { loading ? <Loading /> : (
          <div className="login">
            <img
              src={ logo }
              alt="Logo do Trybe Tunes"
              className="logo-login"
            />
            <form>
              <input
                type="text"
                placeholder="Nome de Usuário"
                onChange={ this.inputName }
                value={ userName }
                className="input-group-text input-user-name"
                data-testid="login-name-input"
              />
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ enableButton }
                onClick={ this.login }
                className="btn btn-primary"
              >
                Entrar
              </button>
            </form>
          </div>
        ) }
        { redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
