import * as actionTypes from './constants'
import { produce } from 'immer'

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
