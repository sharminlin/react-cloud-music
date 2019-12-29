import React, { useEffect, useState } from 'react'
import Swiper from 'swiper'
import "swiper/css/swiper.css"
import { SliderContainer } from './style'

function Slider (props) {
  const { bannerList } = props
  const [sliderSwiper, setSliderSwiper] = useState (null)

  useEffect(() => {
    if (bannerList.length && !sliderSwiper){
        let sliderSwiper = new Swiper('.slider-container', {
          loop: true,
          autoplay: true,
          autoplayDisableOnInteraction: false,
          pagination: { el: '.swiper-pagination' },
        });
        setSliderSwiper(sliderSwiper);
    }
  }, [bannerList.length, sliderSwiper]);

  return (
    <div>
      <SliderContainer>
        <div className="before"></div>
        <div className="slider-container">
          <div className="swiper-wrapper">
            {
              bannerList.map((slider, index) => {
                return (
                  <div className="swiper-slide" key={slider.imageUrl + index}>
                    <div className="slider-nav">
                      <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </SliderContainer>
    </div>
  )
}

export default React.memo(Slider)
