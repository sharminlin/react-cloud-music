import React, { createContext, useReducer } from 'react'
import produce from 'immer'

export const CHANGE_CATEGORY = 'singers/CHANGE_CATEGORY'
export const CHANGE_ALPHA = 'singers/CHANGE_ALPHA'

export const CategoryDataContext = createContext({})

const reducer = produce((state, action) => {
  switch(action.type) {
    case CHANGE_CATEGORY:
      state.category = action.data;
      break;
    case CHANGE_ALPHA:
      state.alpha = action.data;
      break;
    default:
      break;
  }
}, {})

const Data = function (props) {
  const [ data, dispatch ] = useReducer(reducer, {
    category: '',
    alpha: ''
  })

  return (
    <CategoryDataContext.Provider value={{ data, dispatch }}>
      { props.children }
    </CategoryDataContext.Provider>
  )
}

export default React.memo(Data)
