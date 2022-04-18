import React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

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

  async login() {
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
      <div data-testid="page-login">
        <form>
          <label htmlFor="userName">
            UserName
            <input
              type="text"
              name="usernName"
              onChange={ this.inputName }
              value={ userName }
              data-testid="login-name-input"
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ enableButton }
            onClick={ this.login }
          >
            Entrar
          </button>
        </form>
        { loading && <Loading /> }
        <BrowserRouter>
          { redirect && <Redirect to="/search" /> }
        </BrowserRouter>
      </div>
    );
  }
}

export default Login;
