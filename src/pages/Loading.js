import React from 'react';
import '../CSS/loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading-screen">
        <span className="spinner-border text-light" />
        <h1>Carregando...</h1>
      </div>
    );
  }
}

export default Loading;
