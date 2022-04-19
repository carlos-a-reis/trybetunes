import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = ({
      buttonEnable: true,
    });
  }

  handleChange({ target }) {
    const minLength = 2;

    if (target.value.length >= minLength) {
      this.setState({
        buttonEnable: false,
      });
    }
  }

  render() {
    const { buttonEnable } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-input">
            <input
              type="text"
              name="search-input"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ buttonEnable }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
