import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.searchMusics = this.searchMusics.bind(this);
    this.renderAlbums = this.renderAlbums.bind(this);

    this.state = ({
      inputValue: '',
      artist: '',
      albums: [],
      buttonEnable: true,
      loading: false,
      foundAlbums: false,
    });
  }

  handleChange({ target }) {
    const minLength = 2;

    this.setState({
      inputValue: target.value,
    });

    if (target.value.length >= minLength) {
      this.setState({
        buttonEnable: false,
      });
    }
  }

  async searchMusics(event) {
    event.preventDefault();
    const { inputValue } = this.state;

    this.setState({
      loading: true,
      artist: inputValue,
    }, async () => {
      const albums = await searchAlbumsAPI(inputValue);
      this.setState({
        loading: false,
        albums,
        foundAlbums: true,
        inputValue: '',
      });
    });
  }

  renderAlbums(albums) {
    if (albums.length === 0) {
      return (<p>Nenhum álbum foi encontrado</p>);
    }

    const renderedAlbums = albums.map((album, index) => (
      <Link
        to={ `/album/${album.collectionId}` }
        key={ index }
        data-testid={ `link-to-album-${album.collectionId}` }
      >
        <div>
          <img src={ album.artworkUrl100 } alt={ album.collectonName } />
          <p>{ album.collectionName }</p>
          <p>{ album.artistName }</p>
        </div>
      </Link>
    ));
    return renderedAlbums;
  }

  render() {
    const { inputValue, artist, buttonEnable, loading, foundAlbums, albums } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-input">
            <input
              type="text"
              id="search-input"
              onChange={ this.handleChange }
              value={ inputValue }
              data-testid="search-artist-input"
            />
          </label>
          <button
            type="submit"
            disabled={ buttonEnable }
            onClick={ this.searchMusics }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
        { loading && <Loading /> }
        { foundAlbums && (
          <div>
            <h1>
              {`Resultado de álbuns de: ${artist}`}
            </h1>
            { this.renderAlbums(albums) }
          </div>
        )}
      </div>
    );
  }
}

export default Search;
