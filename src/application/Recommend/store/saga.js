import { take, call, put, all, fork } from 'redux-saga/effects'
import { GET_BANNER_LIST, GET_RECOMMEND_LIST } from './constants'
import * as actionCreators from './action'
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';

function * watchGetBannerList () {
  while (true) {
    try {
      yield take(GET_BANNER_LIST)
      const data = yield call(getBannerRequest)
      yield put(actionCreators.changeBannerList(data.banners))
    } catch {
      console.log("轮播图数据传输错误");
    }
  }
}

function * watchGetRecommendList () {
  while (true) {
    try {
      yield take(GET_RECOMMEND_LIST)
      const data = yield call(getRecommendListRequest)
      yield put(actionCreators.changeRecommendList(data.result))
      yield put(actionCreators.changeEnterLoading(false))
    } catch {
      console.log("推荐歌单数据传输错误");
    }
  }
}


export default function * recommendSaga () {
  yield all([
    fork(watchGetBannerList),
    fork(watchGetRecommendList),
  ]);
}
