import * as actionTypes from './constants';
import produce from 'immer';

const defaultState = {
  artist: {},
  songsOfArtist: [],
  loading: true
};

export default produce((draft, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_ARTIST:
      draft.artist = action.data
      break;
    case actionTypes.CHANGE_SONGS_OF_ARTIST:
      draft.songsOfArtist = action.data
      break;
    case actionTypes.CHANGE_ENTER_LOADING:
      draft.loading = action.data
      break;
    default:
      break;
  }
}, defaultState)
