import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../renderer/App.css';
import { useSpring, animated } from 'react-spring';
import CreateTeam from '../simulation-components/CreateTeam';
import mainMenu from '../TACSIM-img/main_menu.svg';
import backButton from '../TACSIM-img/back_button.svg';
import Footer from '../utility/Footer';
import blue_shade from '../TACSIM-img/blu_shade.svg';

export default function Simulation() {
  const [activeMenuItem, setActiveMenuItem] = useState('SELECT STUDENT');

  const fadeIn = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const menuItemArray = [
    { name: 'SELECT STUDENT' },
    { name: 'SELECT MAP' },
    { name: 'WEATHER' },
    { name: 'DIFFICULTY' },
    { name: 'VERIFY' },
  ];

  const handleMenuItemClick = (name) => {
    setActiveMenuItem(name);
  };

  return (
    <div
      className="main_class"
      style={{
        backgroundImage: `url(${mainMenu})`,
      }}
    >
      <div className="simulation_blur_bg">
        <animated.div style={fadeIn}>
          <img src={blue_shade} className="blue_shade_bg" alt="blue shade" />
        </animated.div>

        <div className="side_bar">
          <NavLink className="navigation_button" to="/">
            <span id="first_span_navigation_button">
              <img src={backButton} alt="back" /> SIMULATION /
            </span>
            <span id="second_span_navigation_button">SETTINGS</span>
          </NavLink>
          <div className="menu_side_bar">
            {menuItemArray.map((data, index) => {
              return (
                <div
                  key={index}
                  className={`menu_side_bar_items underline ${
                    activeMenuItem === data.name ? 'active' : ''
                  }`}
                  onClick={() => handleMenuItemClick(data.name)}
                  style={{
                    fontSize: activeMenuItem === data.name ? '2rem' : '1.8rem',
                    fontWeight: activeMenuItem === data.name ? '600' : '500',
                    color:
                      activeMenuItem === data.name ? '#ffffff' : '#dae3eb69',
                    transition: 'all 0.1s ease-in-out',
                  }}
                >
                  {data.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className="simulation_sections">
          <CreateTeam />
          {/* {activeMenuItem === 'SELECT STUDENT' ? (
          <SelectStudent />
        ) : activeMenuItem === 'SELECT MAP' ? (
          <SelectMap />
        ) : activeMenuItem === 'WEATHER' ? (
          <Weather />
        ) : activeMenuItem === 'DIFFICULTY' ? (
          <Difficulty />
        ) : activeMenuItem === 'VERIFY' ? (
          <Verify />
        ) : (
          'PAGE NOT FOUND!'
        )} */}
        </div>

        <Footer />
      </div>
    </div>
  );
}
