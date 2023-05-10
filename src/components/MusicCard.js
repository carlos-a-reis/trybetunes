import propTypes from 'prop-types';
import React from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import heartEmpty from '../images/heart-empty.svg';
import heartFilled from '../images/heart-filled.svg';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.addAndRemoveFavorite = this.addAndRemoveFavorite.bind(this);
    this.checkFavorite = this.checkFavorite.bind(this);

    this.state = ({
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

  async addAndRemoveFavorite() {
    const { songInfo } = this.props;
    const { isFavorite } = this.state;

    this.setState((prevState) => ({
      isFavorite: !prevState.isFavorite,
    }));

    if (isFavorite) {
      await removeSong(songInfo);
    } else {
      await addSong(songInfo);
    }
  }

  render() {
    const { trackName, previewUrl } = this.props;
    const { isFavorite } = this.state;

    return (
      <div className="music-player">
        <p>{ trackName }</p>
        { previewUrl !== undefined && (
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        ) }
        <button
          type="button"
          className="favorite-button"
          onClick={ () => {
            this.addAndRemoveFavorite();
          } }
        >
          <img
            src={ isFavorite ? heartFilled : heartEmpty }
            alt="botão em formato de coração para favoritar a musica"
          />
        </button>
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
