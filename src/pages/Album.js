import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../CSS/album.css';

class Album extends React.Component {
  constructor() {
    super();

    this.musics = this.musics.bind(this);
    this.favoriteMusics = this.favoriteMusics.bind(this);

    this.state = ({
      album: [],
      loading: true,
      favorites: [],
    });
  }

  componentDidMount() {
    this.favoriteMusics();
  }

  async favoriteMusics() {
    const favorites = await getFavoriteSongs();
    const { match } = this.props;

    const musics = await getMusics(match.params.id);

    this.setState({
      album: musics,
      loading: false,
      favorites,
    });
  }

  musics(album) {
    const { favorites } = this.state;

    const musics = album.filter((song, index) => index !== 0);
    const showMusics = musics.map((music, index) => (
      <MusicCard
        songInfo={ music }
        favorites={ favorites }
        trackName={ music.trackName }
        trackId={ music.trackId }
        previewUrl={ music.previewUrl }
        key={ index }
      />
    ));
    return showMusics;
  }

  render() {
    const { album, loading } = this.state;

    return (
      <div className="div-album" data-testid="page-album">
        <Header />
        { loading ? <Loading /> : (
          <div className="music-list-album">
            <div className="album-info">
              <img src={ album[0].artworkUrl100 } alt={ album[0].collectionName } />
              <h2 data-testid="artist-name">{ album[0].artistName }</h2>
              <p data-testid="album-name">{ album[0].collectionName }</p>
            </div>
            <div className="album-list">{ this.musics(album) }</div>
          </div>
        ) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape.isRequired,
};

export default Album;
