import * as actionTypes from './constants'
import produce from 'immer'

const defaultState = {
  rankList: [],
  loading: true
}

const reducer = produce((draft, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_RANKLIST: 
      draft.rankList = action.data
      break
    case actionTypes.CHANGE_LOADING: 
      draft.loading = action.data
      break
    default:
      break
  }
}, defaultState)

export default reducer
