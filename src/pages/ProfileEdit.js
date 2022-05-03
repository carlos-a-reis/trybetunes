import React from 'react';
import propTypes from 'prop-types';
import Loading from './Loading';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

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
      this.setState({
        userName: user.name,
        userEmail: user.email,
        userImage: user.image,
        userDescription: user.description,
        loading: false,
      });
    });
  }

  formEdit() {
    const { userName, userEmail, userImage, userDescription, disableButton } = this.state;

    return (
      <form>
        <label htmlFor="userName">
          <h4>Nome</h4>
          <input
            type="text"
            id="userName"
            onChange={ this.handleEdit }
            value={ userName }
            data-testid="edit-input-name"
          />
        </label>
        <label htmlFor="userEmail">
          <h4>Email</h4>
          <input
            type="text"
            id="userEmail"
            onChange={ this.handleEdit }
            value={ userEmail }
            data-testid="edit-input-email"
          />
        </label>
        <label htmlFor="userDescription">
          <h4>Descrição</h4>
          <textarea
            id="userDescription"
            onChange={ this.handleEdit }
            value={ userDescription }
            data-testid="edit-input-description"
          />
        </label>
        <label htmlFor="userImage">
          <h4>Imagem</h4>
          <input
            type="text"
            id="userImage"
            onChange={ this.handleEdit }
            value={ userImage }
            data-testid="edit-input-image"
          />
          <button
            type="button"
            disabled={ disableButton }
            onClick={ this.saveEdit }
            data-testid="edit-button-save"
          >
            Editar perfil
          </button>
        </label>
      </form>
    );
  }

  checkInputs() {
    const { userName, userEmail, userImage, userDescription } = this.state;
    const minLength = 7;

    const errors = [
      userName.length !== 0,
      userEmail.length !== 0,
      userEmail.length > minLength,
      userEmail.includes('@'),
      userEmail.includes('.com'),
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
      <div data-testid="page-profile-edit">
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
