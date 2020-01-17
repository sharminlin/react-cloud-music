import { all, fork } from 'redux-saga/effects'

import recommendSaga from '../application/Recommend/store/saga'

function * rootSaga () {
  console.log('hello saga')
  yield all([
    fork(recommendSaga)
  ])
}

export default rootSaga
