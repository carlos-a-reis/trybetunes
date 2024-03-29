import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import search from '../images/search-icon.svg';
import '../CSS/search.css';

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
    const minLength = 1;

    this.setState({
      inputValue: target.value,
    });

    if (target.value.length >= minLength) {
      this.setState({
        buttonEnable: false,
      });
    } else {
      this.setState({
        buttonEnable: true,
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
      const albums = await searchAlbumsAPI(inputValue.replace(/\s+/g, '+'));
      const TIME = 200;
      setTimeout(() => {
        this.setState({
          loading: false,
          albums,
          foundAlbums: true,
          inputValue: '',
          buttonEnable: true,
        });
      }, TIME);
    });
  }

  renderAlbums(albums) {
    if (albums.length === 0) {
      return (<p className="not-found">Nenhum resultado foi encontrado</p>);
    }

    const renderedAlbums = albums.map((album, index) => (
      <Link
        to={ `/album/${album.collectionId}` }
        key={ index }
        className="nav-link"
      >
        <div className="album">
          <img src={ album.artworkUrl100 } alt={ album.collectonName } />
          <p className="album-name">{ album.collectionName }</p>
          <p className="artist-name">{ album.artistName }</p>
        </div>
      </Link>
    ));
    return renderedAlbums;
  }

  render() {
    const { inputValue, artist, buttonEnable, loading, foundAlbums, albums } = this.state;

    return (
      <div className="page">
        <Header />
        <div className="search">
          <form className="form-search">
            <input
              type="text"
              onChange={ this.handleChange }
              value={ inputValue }
              className="search-input"
              placeholder="Nome do Artista"
            />
            <button
              type="submit"
              disabled={ buttonEnable }
              onClick={ this.searchMusics }
              className="search-button"
            >
              <img src={ search } alt="lupa de pesquisa" />
            </button>
          </form>
          { loading && <Loading /> }
          { foundAlbums && (
            <div className="results">
              <h4 className="result-titles">
                {`Resultados de "${artist}" :`}
              </h4>
              { this.renderAlbums(albums) }
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
