import React, { useState, useRef, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Container, TopDesc, Menu } from './style';
import SongsList from '../SongsList';
import Header from '../../baseUI/Header/index';
import Scroll from '../../baseUI/Scroll/index';
import Loading from '../../baseUI/Loading/index';
import MusicNote from "../../baseUI/MusicNote/index";
import { isEmptyObject } from '../../api/util'
import { HEADER_HEIGHT } from '../../api/mock'
import style from '../../assets/style/global-style'
import { changeEnterLoading, getAlbumList } from './store/action'

function Album (props) {
  const id = props.match.params.id;

  const { currentAlbum, enterLoading } = props;
  const { getAlbumDataDispatch } = props;

  const [ showStatus, setShowStatus ] = useState(true)
  const [ title, setTitle ] = useState("歌单");
  const [ isMarquee, setIsMarquee ] = useState(false)

  const headerEl = useRef();
  const musicNoteRef = useRef();

  useEffect (() => {
    getAlbumDataDispatch (id);
  }, [getAlbumDataDispatch, id]);
  
  const handleScroll = useCallback((pos) => {
    let minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs(pos.y / minScrollY);
    let headerDom = headerEl.current;
    //滑过顶部的高度开始变化
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = style["theme-color"];
      headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
      setTitle(currentAlbum.name);
      setIsMarquee(true);
    } else {
      headerDom.style.backgroundColor = "";
      headerDom.style.opacity = 1;
      setTitle("歌单");
      setIsMarquee(false);
    }
  }, [currentAlbum]);

  const handleBack = useCallback(() => {
    setShowStatus(false)
  }, [])

  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({ x, y });
  };

  const renderTopDesc = () => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum.coverImgUrl} alt=""/>
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">{Math.floor(currentAlbum.subscribedCount/1000)/10} 万 </span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt=""/>
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    )
  }

  const renderMenu = () => {
    return (
      <Menu>
        <div><i className="iconfont">&#xe6ad;</i>评论</div>
        <div><i className="iconfont">&#xe86f;</i>点赞</div>
        <div><i className="iconfont">&#xe62d;</i>收藏</div>
        <div><i className="iconfont">&#xe606;</i>更多</div>
      </Menu>
    )
  }

  const renderSongList = () => {
    return (
      <SongsList
        songs={currentAlbum.tracks}
        collectCount={currentAlbum.subscribedCount}
        showCollect={true}
        showBackground={true}
        musicAnimation={musicAnimation}
      ></SongsList>
    )
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
        <Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee}></Header>
        {
          !isEmptyObject(currentAlbum)
          ? (
            <Scroll bounceTop={false} onScroll={handleScroll}>
              <div>
                { renderTopDesc() }
                { renderMenu() }
                { renderSongList() }
              </div>
            </Scroll>
          )
          : null
        }
        { enterLoading ? <Loading></Loading> : null }
        <MusicNote ref={musicNoteRef}></MusicNote>
      </Container>
    </CSSTransition>
  )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  currentAlbum: state.album.currentAlbum,
  enterLoading: state.album.enterLoading,
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getAlbumDataDispatch(id) {
      dispatch(changeEnterLoading(true));
      dispatch(getAlbumList(id));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));
