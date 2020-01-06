import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  changePlayingState,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  changeFullScreen
} from "./store/action";
import MiniPlayer from './miniPlayer'
import NormalPlayer from './normalPlayer'
import { getSongUrl, isEmptyObject } from '../../api/util'

function Player (props) {
  const { fullScreen, playList: immutablePlayList, playing, currentIndex, currentSong: immutableCurrentSong } = props;
  const { toggleFullScreenDispatch, togglePlayingDispatch, changeCurrentIndexDispatch, changeCurrentDispatch } = props;

  let currentSong = immutableCurrentSong.toJS();
  const playList = immutablePlayList.toJS();
  // 当前时间
  const [currentTime, setCurrentTime] = useState(0);
  // 歌曲总时长
  const [duration, setDuration] = useState(0);
  // 歌曲播放进度
  let percent = isNaN(currentTime /duration) ? 0 : currentTime / duration;

  const audioRef = useRef()

  useEffect (() => {
    console.log(playList)
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex]
    )
      return;
    changeCurrentIndexDispatch(0);//currentIndex 默认为 - 1，临时改成 0
    let current = playList[0];
    changeCurrentDispatch(current);// 赋值 currentSong
    audioRef.current.src = getSongUrl(current.id);
    setTimeout(() => {
      audioRef.current.play();
    });
    togglePlayingDispatch(true);// 播放状态
    setCurrentTime(0);// 从头开始播放
    setDuration((current.dt/ 1000) | 0);// 时长
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  const clickPlaying = (e, state) => {
    e.stopPropagation();
    togglePlayingDispatch(state);
  };

  return (
    <div>
      {
        isEmptyObject(currentSong) ? null : (
          <MiniPlayer
            song={currentSong}
            fullScreen={fullScreen}
            playing={playing}
            toggleFullScreen={toggleFullScreenDispatch}
            clickPlaying={clickPlaying}
            percent={percent}
          ></MiniPlayer>
        )
      }
      {
        isEmptyObject(currentSong) ? null : (
          <NormalPlayer
            song={currentSong}
            fullScreen={fullScreen}
            playing={playing}
            toggleFullScreen={toggleFullScreenDispatch}
            clickPlaying={clickPlaying}
            percent={percent}
          ></NormalPlayer>
        )
      }
      <audio ref={audioRef}></audio>
    </div>
  )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = state => ({
  fullScreen: state.getIn(["player", "fullScreen"]),
  playing: state.getIn(["player", "playing"]),
  currentSong: state.getIn(["player", "currentSong"]),
  showPlayList: state.getIn(["player", "showPlayList"]),
  mode: state.getIn(["player", "mode"]),
  currentIndex: state.getIn(["player", "currentIndex"]),
  playList: state.getIn(["player", "playList"]),
  sequencePlayList: state.getIn(["player", "sequencePlayList"])
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = dispatch => {
  return {
    togglePlayingDispatch(data) {
      dispatch(changePlayingState(data));
    },
    toggleFullScreenDispatch(data) {
      dispatch(changeFullScreen(data));
    },
    togglePlayListDispatch(data) {
      dispatch(changeShowPlayList(data));
    },
    changeCurrentIndexDispatch(index) {
      dispatch(changeCurrentIndex(index));
    },
    changeCurrentDispatch(data) {
      dispatch(changeCurrentSong(data));
    },
    changeModeDispatch(data) {
      dispatch(changePlayMode(data));
    },
    changePlayListDispatch(data) {
      dispatch(changePlayList(data));
    }
  };
};

// 将 ui 组件包装成容器组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Player));