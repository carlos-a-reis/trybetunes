import React from 'react';
import propTypes from 'prop-types';
import Loading from './Loading';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import '../CSS/profileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.userRequest = this.userRequest.bind(this);
    this.formEdit = this.formEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
    this.saveEdit = this.saveEdit.bind(this);

    this.state = ({
      userName: '',
      userEmail: '',
      userImage: '',
      userDescription: '',
      disableButton: true,
      loading: false,
      loadingSave: false,
    });
  }

  componentDidMount() {
    this.userRequest();
  }

  handleEdit({ target }) {
    this.setState({
      [target.id]: target.value,
    }, () => {
      this.checkInputs();
    });
  }

  async saveEdit() {
    const { userName, userEmail, userImage, userDescription } = this.state;
    const { history: { push } } = this.props;

    await updateUser({
      name: userName,
      email: userEmail,
      image: userImage,
      description: userDescription,
    });

    push('/profile');
  }

  async userRequest() {
    this.setState({
      loading: true,
    }, async () => {
      const user = await getUser();

      if (Object.entries(user).length !== 0) {
        this.setState({
          userName: user.name,
          userEmail: user.email,
          userImage: user.image,
          userDescription: user.description,
          loading: false,
        });
        this.checkInputs();
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }

  formEdit() {
    const { userName, userEmail, userImage, userDescription, disableButton } = this.state;

    return (
      <form className="form-edit">
        <label className="edit-picture" htmlFor="userImage">
          <img
            src={ userImage }
            alt="foto de pertil"
            className="profile-picture-edit"
          />
          <input
            type="text"
            id="userImage"
            onChange={ this.handleEdit }
            value={ userImage }
          />
        </label>
        <label className="edit-info" htmlFor="userName">
          <h4>Nome de Usuário</h4>
          <input
            type="text"
            id="userName"
            onChange={ this.handleEdit }
            value={ userName }
            maxLength={ 30 }
          />
        </label>
        <label className="edit-info" htmlFor="userEmail">
          <h4>E-mail</h4>
          <input
            type="text"
            id="userEmail"
            onChange={ this.handleEdit }
            value={ userEmail }
            maxLength={ 35 }
          />
        </label>
        <label className="edit-info" htmlFor="userDescription">
          <h4>Descrição</h4>
          <textarea
            id="userDescription"
            onChange={ this.handleEdit }
            value={ userDescription }
            maxLength={ 140 }
          />
        </label>
        <button
          type="button"
          disabled={ disableButton }
          onClick={ this.saveEdit }
        >
          Salvar
        </button>
      </form>
    );
  }

  checkInputs() {
    const { userName, userEmail, userImage, userDescription } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errors = [
      userName.length !== 0,
      userEmail.length !== 0,
      emailRegex.test(userEmail),
      userImage.length !== 0,
      userDescription.length !== 0,
    ];

    const enable = errors.every((err) => err === true);

    this.setState({
      disableButton: !enable,
    });
  }

  render() {
    const { loading, loadingSave } = this.state;

    return (
      <div className="profile-edit-page">
        <Header />
        { loading ? <Loading /> : this.formEdit() }
        { loadingSave && <Loading /> }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: propTypes.shape.isRequired,
  push: propTypes.func.isRequired,
};

export default ProfileEdit;
