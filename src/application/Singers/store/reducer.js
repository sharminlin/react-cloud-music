import * as actionTypes from './constants'
import produce from 'immer'

const defaultState = {
  singerList: [],
  pageCount: 0,
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false
}

export default produce((draft, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SINGER_LIST:
      draft.singerList = action.data;
      break;
    case actionTypes.CHANGE_PAGE_COUNT:
      draft.pageCount = action.data;
      break;
    case actionTypes.CHANGE_ENTER_LOADING:
      draft.enterLoading = action.data;
      break;
    case actionTypes.CHANGE_PULLUP_LOADING:
      draft.pullUpLoading = action.data;
      break;
    case actionTypes.CHANGE_PULLDOWN_LOADING:
      draft.pullDownLoading = action.data;
      break;
    default:
      break;
  }
}, defaultState)
