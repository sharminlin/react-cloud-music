import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container } from './style';
import Header from './../../baseUI/Header/index';

function Album (props) {
  let [ showStatus, setShowStatus ] = useState(true)

  function handleBack () {
    setShowStatus(false)
  }

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container>
      <Header title="返回" handleClick={handleBack}></Header>
      </Container>
    </CSSTransition>
  )
}

export default React.memo(Album);
