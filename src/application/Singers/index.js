import React, { useState } from 'react'
import Horizen from '../../baseUI/HorizenItem'
import { categoryTypes, alphaTypes } from '../../api/mock'
import { NavContainer } from './style'

function Singer (props) {
  let [ category, setCategory ] = useState('')
  let [ alpha, setAlpha ] = useState('')

  function changeCategory (value) {
    setCategory(value)
  }

  function changeAlpha (value) {
    setAlpha(value)
  }

  return (
    <NavContainer>
      <Horizen list={categoryTypes} title="分类 (默认热门):" oldVal={category} handleClick={changeCategory}></Horizen>
      <Horizen list={alphaTypes} title="分类 (默认热门):" oldVal={alpha} handleClick={changeAlpha}></Horizen>
    </NavContainer>
  )
}

export default React.memo(Singer)
