import React, { useState, useCallback, useRef, useEffect } from 'react'
import { CSSTransition } from "react-transition-group";
import { Container, ImgWrapper, CollectButton, SongListWrapper, BgLayer } from "./style";
import Header from '../../baseUI/Header'
import Scroll from '../../baseUI/Scroll'
import SongsList from "../SongsList"
import { HEADER_HEIGHT } from '../../api/mock'

function Singer (props) {
  const [ showStatus, setShowStatus ] = useState(true)

  const artist = {
    picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
    name: "薛之谦",
    hotSongs: [1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28,29].map(i => {
      return {
        id: i,
        name: "我好像在哪见过你",
        ar: [{name: "薛之谦"}],
        al: {
          name: "薛之谦专辑"
        }
      }
    })
  }

  const collectButton = useRef();
  const imageWrapper = useRef();
  const songScrollWrapper = useRef();
  const songScroll = useRef();
  const header = useRef();
  const layer = useRef();
  // 图片初始高度
  const initialHeight = useRef(0);

  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5;

  useEffect(() => {
    let h = imageWrapper.current.offsetHeight;
    songScrollWrapper.current.style.top = `${h - OFFSET}px`;
    initialHeight.current = h;
    // 把遮罩先放在下面，以裹住歌曲列表
    layer.current.style.top = `${h - OFFSET}px`;
    songScroll.current.refresh();
    //eslint-disable-next-line
  }, []);

  const handleScroll = useCallback(pos => {
    let height = initialHeight.current;
    const newY = pos.y;
    const imageDOM = imageWrapper.current;
    const buttonDOM = collectButton.current;
    const headerDOM = header.current;
    const layerDOM = layer.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    //指的是滑动距离占图片高度的百分比
    const percent = Math.abs(newY / height);

    if (newY > 0) {
      imageDOM.style["transform"] = `scale(${1 + percent})`;
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    } else if (newY >= minScrollY) {
      layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
      //这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
      layerDOM.style.zIndex = 1;
      imageDOM.style.paddingTop = "75%";
      imageDOM.style.height = 0;
      imageDOM.style.zIndex = -1;
      //按钮跟着移动且渐渐变透明
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      buttonDOM.style["opacity"] = `${1 - percent * 2}`;
    } else if (newY < minScrollY) {
      //往上滑动，但是超过Header部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerDOM.style.zIndex = 1;
      //防止溢出的歌单内容遮住Header
      headerDOM.style.zIndex = 100;
      //此时图片高度与Header一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
    }
  }, [])

  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
  }, []);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container>
      <Header ref={header} title={"头部"} handleClick={setShowStatusFalse} ></Header>
      <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
        <div className="filter"></div>
      </ImgWrapper>
      <CollectButton ref={collectButton}>
        <i className="iconfont">&#xe62d;</i>
        <span className="text"> 收藏 </span>
      </CollectButton>
      <BgLayer ref={layer}></BgLayer>
      <SongListWrapper ref={songScrollWrapper}>
        <Scroll ref={songScroll} onScroll={handleScroll}>
          <SongsList
            songs={artist.hotSongs}
            showCollect={false}
          ></SongsList>
        </Scroll>
      </SongListWrapper>
      </Container>
    </CSSTransition>
  )
}

export default React.memo(Singer)