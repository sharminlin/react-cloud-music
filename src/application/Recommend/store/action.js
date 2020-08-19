import * as actionTypes from './constants';

export const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: data
});

export const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: data
});

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data: data
})

export const getBannerList = () => ({
  type: actionTypes.GET_BANNER_LIST
})

export const getRecommendList = () => ({
  type: actionTypes.GET_RECOMMEND_LIST
})
