import React, { useEffect, useContext } from 'react'
import { connect } from 'react-redux'
import LazyLoad, { forceCheck } from 'react-lazyload'
import Horizen from '../../baseUI/HorizenItem'
import Scroll from '../../baseUI/Scroll'
import Loading from '../../baseUI/Loading'
import { categoryTypes, alphaTypes } from '../../api/mock'
import { NavContainer, ListContainer, List, ListItem } from './style'
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList
} from './store/action';
import { CHANGE_CATEGORY, CHANGE_ALPHA, CategoryDataContext } from './data'

function Singer (props) {
  // let [ category, setCategory ] = useState('')
  // let [ alpha, setAlpha ] = useState('')
  const { data, dispatch } = useContext(CategoryDataContext)
  const { category, alpha } = data.toJS()

  const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props
  const { getHotSingerDispatch, updateDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch } = props

  useEffect(() => {
    if (!singerList.size) {
      getHotSingerDispatch()
    }
    // eslint-disable-next-line
  }, [])

  function handleChangeCategory (value) {
    // setCategory(value)
    dispatch({ type: CHANGE_CATEGORY, data: value })
    updateDispatch(value, alpha)
  }

  function handleChangeAlpha (value) {
    // setAlpha(value)
    dispatch({ type: CHANGE_ALPHA, data: value })
    updateDispatch(category, value)
  }

  function handlePullUp () {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount)
  }

  function handlePullDown () {
    pullDownRefreshDispatch(category, alpha)
  }

  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    const singerListJS = singerList ? singerList.toJS() : []
    return (
      <List>
        {
          singerListJS.map((item, index) => {
            return (
              <ListItem key={item.accountId + '-' + index }>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img src={require('./singer.png')} width="100%" height="100%" alt="music" />}>
                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                  </LazyLoad>
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  };

  return (
    <React.Fragment>
      <NavContainer>
        <Horizen list={categoryTypes} title="分类 (默认热门):" oldVal={category} handleClick={handleChangeCategory}></Horizen>
        <Horizen list={alphaTypes} title="首字母:" oldVal={alpha} handleClick={handleChangeAlpha}></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll
          pullUp={ handlePullUp }
          pullDown={ handlePullDown }
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
        >
          { renderSingerList() }
        </Scroll>
      </ListContainer>
      <Loading show={enterLoading}></Loading>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  pageCount: state.getIn(['singers', 'pageCount']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading'])
})

const mapDispatchToProps = (dispatch) => ({
  // 热门歌手
  getHotSingerDispatch () {
    dispatch(getHotSingerList())
  },
  // 更新
  updateDispatch (category, alpha) {
    dispatch(changePageCount(0))
    dispatch(changeEnterLoading(true))
    dispatch(getSingerList(category, alpha))
  },
  // 滑到最底部刷新部分的处理
  pullUpRefreshDispatch(category, alpha, hot, count) {
    dispatch(changePullUpLoading(true));
    dispatch(changePageCount(count + 1));
    if(hot){
      dispatch(refreshMoreHotSingerList());
    } else {
      dispatch(refreshMoreSingerList(category, alpha));
    }
  },
  //顶部下拉刷新
  pullDownRefreshDispatch(category, alpha) {
    dispatch(changePullDownLoading(true));
    dispatch(changePageCount(0));//属于重新获取数据
    if (category === '' && alpha === '') {
      dispatch(getHotSingerList());
    } else {
      dispatch(getSingerList(category, alpha));
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer))
