import propTypes from 'prop-types';
import React from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.addAndRemoveFavorite = this.addAndRemoveFavorite.bind(this);
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

  async addAndRemoveFavorite({ target }) {
    const { songInfo, removeFavorite } = this.props;

    if (removeFavorite) {
      removeFavorite(songInfo);
    } else {
      this.setState((prevState) => ({
        isFavorite: !prevState.isFavorite,
      }));

      this.setState({
        loading: true,
      });

      if (target.checked) {
        await addSong(songInfo);
      } else {
        await removeSong(songInfo);
      }

      this.setState({
        loading: false,
      });
    }
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
        <label htmlFor={ `favorite-song${trackId}` }>
          Favorita
          <input
            type="checkbox"
            id={ `favorite-song${trackId}` }
            checked={ isFavorite }
            onChange={ this.addAndRemoveFavorite }
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
  removeFavorite: propTypes.func.isRequired,
};

export default MusicCard;
