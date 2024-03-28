import { NavLink } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Mousewheel, Pagination } from 'swiper/modules';
import { useSpring, animated } from '@react-spring/web';
import 'swiper/css';
import '../renderer/App.css';
import blue_shade from '../TACSIM-img/blu_shade.svg';
import mainMenu from '../TACSIM-img/main_menu.svg';

SwiperCore.use([Mousewheel, Pagination]);

export default function MainMenu() {
  const buttonArray = [
    { name: 'START SIMULATION', link: '/simulation' },
    { name: 'SETTINGS', link: '/settings' },
    { name: 'TUTORIALS', link: '/tutorials' },
    { name: 'ADD USERS', link: '/add_user' },
    { name: 'PAST SIMULATIONS', link: '/past_simulation' },
  ];

  const springs = useSpring({
    from: { x: -1000 },
    to: { x: 0 },
    delay: 300,
  });

  const fadeIn = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 300 },
  });

  const swiperRef = useRef(null);

  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper;

    if (swiperInstance) {
      const scaleSlides = () => {
        swiperInstance.slides.forEach((slide, index) => {
          let scale = 1 - Math.abs(index - swiperInstance.activeIndex) * 0.1;
          scale = Math.max(scale, 0.72);
          slide.style.transform = `scale(${scale})`;
        });
      };

      scaleSlides();
      swiperInstance.on('slideChange', scaleSlides);
    }
  }, []);

  return (
    <div className="main_class" style={{ backgroundImage: `url(${mainMenu})` }}>
      <animated.div style={fadeIn}>
        <img src={blue_shade} className="blue_shade_bg" alt="blue shade" />
      </animated.div>
      <div className="main_content">
        <NavLink to="/">Home</NavLink>
        <div className="button_slider">
          <animated.div style={springs}>
            <Swiper
              ref={swiperRef}
              direction="vertical"
              centeredSlides={true}
              loop={true}
              mousewheel={true}
              pagination={{ clickable: true }}
              slidesPerView={5}
              className="mySwiper"
            >
              {buttonArray.map((data, index) => (
                <SwiperSlide key={index} className="swiper_slide">
                  <NavLink to={data.link} className="button_slider_button">
                    <span>{data.name}</span>
                  </NavLink>
                </SwiperSlide>
              ))}
            </Swiper>
          </animated.div>
        </div>
      </div>
    </div>
  );
}
