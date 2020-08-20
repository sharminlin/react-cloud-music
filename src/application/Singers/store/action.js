import {
  CHANGE_SINGER_LIST,
  CHANGE_PAGE_COUNT,
  CHANGE_PULLUP_LOADING,
  CHANGE_PULLDOWN_LOADING,
  CHANGE_ENTER_LOADING
} from './constants';

import {
  getHotSingerListRequest,
  getSingerListRequest
} from "../../../api/request";

export const changeSingerList = (data) => ({ type: CHANGE_SINGER_LIST, data })

export const changePageCount = (data) => ({ type: CHANGE_PAGE_COUNT, data })

export const changePullUpLoading = (data) => ({ type: CHANGE_PULLUP_LOADING, data })

export const changePullDownLoading = (data) => ({ type: CHANGE_PULLDOWN_LOADING, data })

export const changeEnterLoading = (data) => ({ type: CHANGE_ENTER_LOADING, data })

export const getHotSingerList = () => {
  return dispatch => {
    getHotSingerListRequest(0).then(res => {
      const data = res.artists
      dispatch(changeSingerList(data))
      dispatch(changeEnterLoading(false))
      dispatch(changePullDownLoading(false))
    }).catch((error) => {
      console.log(error)
    })
  }
}

export const refreshMoreHotSingerList = () => {
  return (dispatch, getState) => {
    const pageCount = getState().singers.pageCount;
    const singerList = getState().singers.singerList;
    getHotSingerListRequest(pageCount).then(res => {
      const data = [...singerList, ...res.artists];
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
    }).catch(() => {
      console.log('热门歌手数据获取失败');
    });
  }
};

export const getSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    getSingerListRequest(category, alpha, 0).then(res => {
      const data = res.artists
      dispatch(changeSingerList(data))
      dispatch(changeEnterLoading(false))
      dispatch(changePullDownLoading(false))
    }).catch((error) => {
      console.log(error)
    })
  }
}

export const refreshMoreSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    const pageCount = getState().singers.pageCount;
    const singerList = getState().singers.singerList;
    getSingerListRequest(category, alpha, pageCount).then(res => {
      const data = [...singerList, ...res.artists];
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
    }).catch(() => {
      console.log('歌手数据获取失败');
    });
  }
};
