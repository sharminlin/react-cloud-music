import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle  } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import BetterScroll from "better-scroll"

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Scroll = forwardRef((props, ref) => {
  const { direction, click, refresh, bounceTop, bounceBottom } = props
  const { pullUp, pullDown, onScroll } = props

  //better-scroll 实例对象
  const [bScroll, setBScroll] = useState()
  //current 指向初始化 bs 实例需要的 DOM 元素
  const scrollContaninerRef = useRef()

  // 初始化bScroll实例
  useEffect (() => {
    const scroll = new BetterScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce:{
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    }
    // eslint-disable-next-line
  }, []);

  // 绑定on scroll事件
  useEffect (() => {
    if (!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll);
    })
    return () => {
      bScroll.off('scroll');
    }
  }, [onScroll, bScroll]);

  // 注册上拉到底事件
  useEffect (() => {
    if (!bScroll || !pullUp) return;
    bScroll.on('scrollEnd', () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp();
      }
    });
    return () => {
      bScroll.off ('scrollEnd');
    }
  }, [pullUp, bScroll]);

  // 注册下拉刷新事件
  useEffect (() => {
    if (!bScroll || !pullDown) return;
    bScroll.on('touchEnd', (pos) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDown();
      }
    });
    return () => {
      bScroll.off ('touchEnd');
    }
  }, [pullDown, bScroll]);

  // 更新bSroll
  useEffect (() => {
    if (refresh && bScroll){
      bScroll.refresh();
    }
  });

  // 一般和 forwardRef 一起使用，ref 已经在 forWardRef 中默认传入
  useImperativeHandle(ref, () => ({
    // 给外界暴露 refresh 方法
    refresh () {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    // 给外界暴露 getBScroll 方法，提供 bs 实例
    getBScroll () {
      if (bScroll) {
        return bScroll;
      }
    }
  }));

  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
    </ScrollContainer>
  );
})

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll:null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,//是否支持向上吸顶
  bounceBottom: PropTypes.bool//是否支持向下吸顶
};

export default Scroll
