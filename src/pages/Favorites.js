import React from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCardFavorite from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../CSS/favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();

    this.favoriteSongs = this.favoriteSongs.bind(this);
    this.songRequest = this.songRequest.bind(this);
    this.Reloadsongs = this.Reloadsongs.bind(this);
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

  async Reloadsongs() {
    const favorites = await getFavoriteSongs();

    this.setState({
      favorites,
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
        cardType="fav"
        key={ index }
      />
    ));

    return musics;
  }

  removeFavorite(music) {
    removeSong(music);
    this.Reloadsongs();
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
