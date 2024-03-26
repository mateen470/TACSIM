import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import '../renderer/App.css';
import mainMenu from '../TACSIM-img/main_menu.svg';
import backButton from '../TACSIM-img/back_button.svg';
import reset from '../TACSIM-img/reset.svg';
import Footer from '../utility/Footer';

export default function PastSimulations() {
  const [active, setActive] = useState(false);

  const springs = useSpring({
    from: { x: 2000, y: 135 },
    to: { x: 0 },
    delay: 200,
  });

  const trainingArray = [
    {
      trainerName: 'ALI MEHMOOD',
      terrain: 'MUDDY FORREST',
      enemyVehicle: {
        APC: 24,
        TANK: 21,
      },
      score: 57,
      PNO: 23457,
    },
  ];
  const recentArray = [
    {
      trainerName: 'IMTIAZ MEHMOOD',
      terrain: 'DESSERT',
      enemyVehicle: {
        APC: 14,
        TANK: 21,
      },
      score: 57,
      PNO: 23257,
    },
  ];

  const trainingStyle = {
    opacity: !active ? 1 : 0,
    height: active && '0px',
    overflow: 'hidden',
    transition: 'opacity 0.4s ease-in-out',
  };
  const recentStyle = {
    opacity: active ? 1 : 0,
    height: !active && '0px',
    overflow: 'hidden',
    transition: 'opacity 0.4s ease-in-out',
  };

  return (
    <div className="main_class" style={{ backgroundImage: `url(${mainMenu})` }}>
      <NavLink className="navigation_button_with_bigger_width_2" to="/">
        <span id="first_span_navigation_button">
          <img src={backButton} alt="back" /> MAIN MENU /
        </span>
        <span id="second_span_navigation_button">SIMULATION HISTORY</span>
      </NavLink>
      <animated.div style={springs}>
        <div className="past_simulation_main_content_container">
          <div className="past_simulation_tab_heading_filter_box">
            <div className="past_simulation_tab_heading_box">
              <div
                onClick={() => setActive(false)}
                style={{
                  cursor: 'pointer',
                  color: !active ? 'white' : '#dae3eb',
                  fontWeight: !active ? 700 : 600,
                  fontSize: !active ? '1.6rem' : '1.4rem',
                  transition: 'all 0.1s ease',
                }}
              >
                TRAINING
              </div>
              <div
                onClick={() => setActive(true)}
                style={{
                  cursor: 'pointer',
                  color: active ? 'white' : '#dae3eb',
                  fontWeight: active ? 700 : 600,
                  fontSize: active ? '1.6rem' : '1.4rem',
                  transition: 'all 0.1s ease',
                }}
              >
                RECENT
              </div>
            </div>
            <div className="past_simulation_tab_filter_box">
              <div className="past_simulation_tab_filter">FILTER : </div>
              <img src={reset} alt="reset" style={{ cursor: 'pointer' }} />
            </div>
          </div>

          <div className="past_simulation_tab_table">
            <div className="past_simulation_tab_table_heading_container">
              <div className="past_simulation_tab_table_name_heading">NAME</div>
              <div className="past_simulation_tab_table_heading">P. NO</div>
              <div className="past_simulation_tab_table_heading">SCORE</div>
            </div>

            <div style={trainingStyle}>
              {trainingArray.map((data, index) => {
                const enemyVehiclesArray = Object.entries(
                  data.enemyVehicle || {},
                );
                return (
                  <div
                    className="past_simulation_tab_table_data_container"
                    key={index}
                  >
                    <div className="past_simulation_tab_table_name_data">
                      <div id="past_simulation_tab_table_name_data_first_phrase">
                        {data.trainerName} - {data.terrain}
                      </div>
                      <div id="past_simulation_tab_table_name_data_second_phrase">
                        {data.terrain} -
                        {enemyVehiclesArray.map(
                          ([vehicleType, count], index) => {
                            return (
                              <span key={index}>
                                {vehicleType.toUpperCase()} {count}
                                {index < enemyVehiclesArray.length - 1
                                  ? ', '
                                  : ''}
                              </span>
                            );
                          },
                        )}
                      </div>
                    </div>
                    <div
                      className="past_simulation_tab_table_data"
                      style={{ color: '#ffffff' }}
                    >
                      {data.PNO}
                    </div>
                    <div className="past_simulation_tab_table_data">
                      {data.score}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={recentStyle}>
              {recentArray.map((data, index) => {
                const enemyVehiclesArray = Object.entries(
                  data.enemyVehicle || {},
                );
                return (
                  <div
                    className="past_simulation_tab_table_data_container"
                    key={index}
                  >
                    <div className="past_simulation_tab_table_name_data">
                      <div id="past_simulation_tab_table_name_data_first_phrase">
                        {data.trainerName} - {data.terrain}
                      </div>
                      <div id="past_simulation_tab_table_name_data_second_phrase">
                        {data.terrain} -
                        {enemyVehiclesArray.map(
                          ([vehicleType, count], index) => {
                            return (
                              <span key={index}>
                                {vehicleType.toUpperCase()} {count}
                                {index < enemyVehiclesArray.length - 1
                                  ? ', '
                                  : ''}
                              </span>
                            );
                          },
                        )}
                      </div>
                    </div>
                    <div
                      className="past_simulation_tab_table_data"
                      style={{ color: '#ffffff' }}
                    >
                      {data.PNO}
                    </div>
                    <div className="past_simulation_tab_table_data">
                      {data.score}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </animated.div>

      <Footer footerNumber={1} />
    </div>
  );
}
