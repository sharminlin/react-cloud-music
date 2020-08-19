import * as actionTypes from './constants'
// import { fromJS } from 'immutable'
import { produce } from 'immer'
/*
const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
  enterLoading: true
});


export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set('bannerList', action.data)
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set('recommendList', action.data);
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data);
    default:
      return state;
  }
}
*/

const defaultState = {
  bannerList: [],
  recommendList: [],
  enterLoading: true
};

export default produce((draft, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      draft.bannerList = action.data;
      break;
    case actionTypes.CHANGE_RECOMMEND_LIST:
      draft.recommendList = action.data;
      break;
    case actionTypes.CHANGE_ENTER_LOADING:
      draft.enterLoading = action.data;
      break;
    default:
      break;
  }
}, defaultState)
