import React from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCardFavorite from '../components/MusicCardFavorite';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../CSS/favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();

    this.favoriteSongs = this.favoriteSongs.bind(this);
    this.songRequest = this.songRequest.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);

    this.state = ({
      loading: false,
      favorites: [],
    });
  }

  componentDidMount() {
    this.songRequest();
  }

  async songRequest() {
    this.setState({
      loading: true,
    });

    const favorites = await getFavoriteSongs();

    this.setState({
      favorites,
      loading: false,
    });
  }

  favoriteSongs() {
    const { favorites } = this.state;

    const musics = favorites.map((music, index) => (
      <MusicCardFavorite
        songInfo={ music }
        favorites={ favorites }
        trackName={ music.trackName }
        trackId={ music.trackId }
        previewUrl={ music.previewUrl }
        removeFavorite={ this.removeFavorite }
        key={ index }
      />
    ));

    return musics;
  }

  removeFavorite(music) {
    removeSong(music);
    this.songRequest();
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="favorites-page" data-testid="page-favorites">
        <Header />
        { loading ? <Loading /> : (
          <div className="favorites">
            <h2>Músicas Favoritas:</h2>
            { this.favoriteSongs() }
          </div>
        ) }
      </div>
    );
  }
}

export default Favorites;
