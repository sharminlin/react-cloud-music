import { fromJS } from 'immutable'
import * as actionTypes from './constants'

const defaultState = fromJS({
  rankList: [],
  loading: true
})

const reducer =  (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_RANKLIST: 
      return state.set('rankList', action.data)
    case actionTypes.CHANGE_LOADING: 
      return state.set('loading', action.data)
    default:
      return state
  }
}

export default reducer
