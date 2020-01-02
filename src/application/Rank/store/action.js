import { getRankListRequest } from '../../../api/request'
import { CHANGE_RANKLIST, CHANGE_LOADING } from './constants'
import { fromJS } from 'immutable'

export const changeRankList = (data) => ({
  type: CHANGE_RANKLIST,
  data: fromJS(data)
})

export const changeLoading = (data) => ({
  type: CHANGE_LOADING,
  data
})

export const getRankList = () => {
  return (dispatch) => {
    getRankListRequest().then(data => {
      let list = data && data.list ? data.list : []
      dispatch(changeRankList(list))
      dispatch(changeLoading(false))
    })
  }
}
