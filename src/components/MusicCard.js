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
    const { songInfo, cardType, removeFavorite } = this.props;
    const { isFavorite } = this.state;

    if (cardType === 'fav') {
      removeFavorite(songInfo);
    } else {
      this.setState((prevState) => ({
        isFavorite: !prevState.isFavorite,
      }));

      if (isFavorite) {
        await removeSong(songInfo);
      } else {
        await addSong(songInfo);
      }
    }
  }

  render() {
    const { songInfo, trackName, previewUrl, cardType } = this.props;
    const { isFavorite } = this.state;

    return (
      <div className={ `music-player-${cardType}` }>
        { cardType === 'fav' && (
          <img src={ songInfo.artworkUrl100 } alt={ `capa da musica ${trackName}` } />
        ) }
        <p>{ trackName }</p>
        { previewUrl !== undefined && (
          <audio src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        ) }
        <button
          type="button"
          className={ `like-button-${cardType}` }
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
  cardType: propTypes.string.isRequired,
  removeFavorite: propTypes.func.isRequired,
};

export default MusicCard;
