import * as actionTypes from './constants';
import produce from 'immer';

const defaultState = {
  currentAlbum: {},
  enterLoading: false,
}

export default produce((draft, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_ALBUM:
      draft.currentAlbum = action.data;
      break;
    case actionTypes.CHANGE_ENTER_LOADING:
      draft.enterLoading = action.data;
      break;
    default:
      break;
  }
}, defaultState);
