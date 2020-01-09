import { axiosInstance } from './config'

export const getBannerRequest = () => axiosInstance.get ('/banner')

export const getRecommendListRequest = () => axiosInstance.get ('/personalized')

export const getHotSingerListRequest = (count) => axiosInstance.get(`/top/artists?offset=${count}`);

export const getSingerListRequest = (category, alpha, count) => axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);

export const getRankListRequest = () => axiosInstance.get(`/toplist/detail`)

export const getAlbumDetailRequest = id => axiosInstance.get(`/playlist/detail?id=${id}`)

export const getSingerInfoRequest = id => axiosInstance.get(`/artists?id=${id}`)

export const getLyricRequest = id => axiosInstance.get(`/lyric?id=${id}`)

export const getHotKeyWordsRequest = () => {
  return axiosInstance.get (`/search/hot`);
};

export const getSuggestListRequest = query => {
  return axiosInstance.get (`/search/suggest?keywords=${query}`);
};

export const getResultSongsListRequest = query => {
  return axiosInstance.get (`/search?keywords=${query}`);
};

export const getSongDetailRequest = id => {
  return axiosInstance.get(`/song/detail?ids=${id}`);
};