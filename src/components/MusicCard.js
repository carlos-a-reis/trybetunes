import propTypes from 'prop-types';
import React from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.addFavorite = this.addFavorite.bind(this);
    this.checkFavorite = this.checkFavorite.bind(this);

    this.state = ({
      loading: false,
      isFavorite: false,
    });
  }

  componentDidMount() {
    this.checkFavorite();
  }

  checkFavorite() {
    const { favorites, songInfo } = this.props;
    const isFavoriteSong = favorites.some((song) => song.trackId === songInfo.trackId);
    this.setState({
      isFavorite: isFavoriteSong,
    });
  }

  async addFavorite({ target }) {
    const { songInfo } = this.props;

    this.setState((prevState) => ({
      isFavorite: !prevState.isFavorite,
    }));

    this.setState({
      loading: true,
    });

    if (target.checked) {
      await addSong(songInfo);
    }

    this.setState({
      loading: false,
    });
  }

  render() {
    const { trackName, trackId, previewUrl } = this.props;
    const { loading, isFavorite } = this.state;

    return (
      <div>
        <p>{ trackName }</p>
        { previewUrl !== undefined && (
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        ) }
        <label htmlFor="favorite-song">
          Favoritar
          <input
            type="checkbox"
            id="favorite-song"
            checked={ isFavorite }
            onChange={ this.addFavorite }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
        { loading && <Loading /> }
      </div>
    );
  }
}

MusicCard.propTypes = {
  songInfo: propTypes.shape.isRequired,
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  favorites: propTypes.arrayOf.isRequired,
};

export default MusicCard;
