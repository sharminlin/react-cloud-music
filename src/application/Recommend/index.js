import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config';
import { forceCheck } from 'react-lazyload'
import Slider from '../../components/Slider'
import RecommendList from '../../components/List'
import Loading from '../../baseUI/Loading'
import Scroll from '../../baseUI/Scroll'
import { Content } from './style'
import * as actionCreators from './store/action';

function Recommend (props) {
  const { bannerList, recommendList, enterLoading, songsCount } = props
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props

  useEffect(() => {
    if (!bannerList.length) {
      getBannerDataDispatch()
    }
    if (!recommendList.length) {
      getRecommendListDataDispatch()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Content play={songsCount}>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
      { enterLoading ? <Loading></Loading> : null }
      { renderRoutes(props.route.children) }
    </Content>
  )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => {
  return ({
    bannerList: state.recommend.bannerList,
    recommendList: state.recommend.recommendList,
    enterLoading: state.recommend.recommendList,
    songsCount: state.player.playList.length
  });
}

// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch () {
      dispatch(actionCreators.getBannerList());
    },
    getRecommendListDataDispatch () {
      dispatch(actionCreators.getRecommendList());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))
