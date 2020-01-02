import React, { createContext, useReducer } from 'react'
import { fromJS } from 'immutable'

export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'
export const CHANGE_ALPHA = 'CHANGE_ALPHA'

export const CategoryDataContext = createContext({})

const reducer = (state, action) => {
  switch(action.type) {
    case CHANGE_CATEGORY: 
      return state.set('category', action.data)
    case CHANGE_ALPHA:
      return state.set('alpha', action.data)
    default: 
      return state
  }
}

const Data = function (props) {
  const [ data, dispatch ] = useReducer(reducer, fromJS({
    category: '',
    alpha: ''
  }))

  return (
    <CategoryDataContext.Provider value={{ data, dispatch }}>
      { props.children }
    </CategoryDataContext.Provider>
  )
}

export default React.memo(Data)
