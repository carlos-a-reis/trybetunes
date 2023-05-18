import React from 'react';
import error from '../images/error.svg';
import '../CSS/notFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <div className="not-found-page">
        <img src={ error } alt="icone de erro" />
        <div className="error-message">
          <p>Página</p>
          <p>Não</p>
          <p>Encontrada</p>
        </div>
      </div>
    );
  }
}

export default NotFound;
