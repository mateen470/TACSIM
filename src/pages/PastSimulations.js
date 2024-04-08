import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { useDispatch } from 'react-redux';
import { teamData } from '../redux/SimulationSlice';
import mainMenu from '../TACSIM-img/main_menu.svg';
import backButton from '../TACSIM-img/back_button.svg';
import reset from '../TACSIM-img/reset.svg';
import blue_shade from '../TACSIM-img/blu_shade.svg';
import Footer from '../utility/Footer';
import SingleSimulation from './SingleSimulation';

export default function PastSimulations() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [toggle, setToggle] = useState(true);

  const springs = useSpring({
    from: { x: 2000, y: 135 },
    to: { x: 0 },
    delay: 200,
  });
  const springs2 = useSpring({
    from: { x: -2000 },
    to: { x: 0 },
    delay: 200,
  });

  const fillArrayOfClickedSimulation = (team) => {
    dispatch(teamData(team));
    setToggle(false);
  };

  const trainingArray = [
    {
      date: '1/5/2015',
      time: '16:56',
      area: 'UMERKOT',
      instrcutor: 'major bajwa',
      terrain: 'MUDDY FORREST',
      enemyVehicle: {
        APC: 24,
        TANK: 21,
      },
      score: 57,
      PNO: 23457,
      team: [
        {
          teamCode: 'TP-1',
          teamPlayer: [
            {
              playerName: 'ALI AHMED',
              playerRank: 'alpha',
              playerPNO: '23212',
              playerReport: 'url',
              playerVideo: 'https://www.youtube.com/embed/video-id-1',
            },
            {
              playerName: 'MUKHTAR',
              playerPNO: '633434',
              playerRank: 'bravo',
              playerReport: 'url',
              playerVideo: 'https://www.youtube.com/embed/video-id-1',
            },
            {
              playerName: 'AHMED',
              playerRank: 'commander',
              playerPNO: '83212',
              playerReport: 'url',
              playerVideo: 'https://www.youtube.com/embed/video-id-1',
            },
          ],
        },
      ],
    },
  ];
  const recentArray = [
    {
      date: '1/5/2015',
      time: '16:56',
      area: 'UMERKOT',
      terrain: 'DESSERT',
      instrcutor: 'major bajwa',
      enemyVehicle: {
        APC: 14,
        TANK: 21,
      },
      score: 57,
      PNO: 23257,
      team: [
        {
          teamCode: 'TP-2',
          teamPlayer: [
            {
              playerName: 'ALI AHMED',
              playerRank: 'alpha',
              playerPNO: '23212',
              playerReport: 'url',
              playerVideo: 'https://www.youtube.com/embed/video-id-1',
            },
            {
              playerName: 'MUKHTAR',
              playerRank: 'bravo',
              playerPNO: '633434',
              playerReport: 'url',
              playerVideo: 'https://www.youtube.com/embed/video-id-1',
            },
            {
              playerName: 'AHMED',
              playerPNO: '83212',
              playerRank: 'commander',
              playerReport: 'url',
              playerVideo: 'https://www.youtube.com/embed/video-id-1',
            },
          ],
        },
      ],
    },
  ];

  const trainingStyle = {
    opacity: !active ? 1 : 0,
    height: active && '0px',
    overflow: 'hidden',
    transition: 'opacity 0.5s ease-in-out',
  };
  const recentStyle = {
    opacity: active ? 1 : 0,
    height: !active && '0px',
    overflow: 'hidden',
    transition: 'opacity 0.5s ease-in-out',
  };

  return (
    <div className="main_class" style={{ backgroundImage: `url(${mainMenu})` }}>
      <animated.div style={springs2}>
        <img src={blue_shade} className="blue_shade_bg" alt="blue shade" />
      </animated.div>
      <NavLink className="navigation_button_with_bigger_width_2" to="/">
        <span id="first_span_navigation_button">
          <img src={backButton} alt="back" /> MAIN MENU /
        </span>
        <span id="second_span_navigation_button">SIMULATION HISTORY</span>
      </NavLink>
      <animated.div style={springs}>
        <div className="past_simulation_main_content_container">
          <div
            className="past_simulation_all_simulations_container"
            style={{
              opacity: toggle ? 1 : 0,
              height: !toggle && '0px',
              zIndex: !toggle && -1,
              transition: 'opacity 0.5s ease',
            }}
          >
            <div className="past_simulation_tab_heading_filter_box">
              <div className="past_simulation_tab_heading_box">
                <div
                  onClick={() => setActive(false)}
                  style={{
                    cursor: 'pointer',
                    color: !active ? 'white' : '#dae3eb',
                    fontWeight: !active ? 700 : 600,
                    fontSize: !active ? '1.6rem' : '1.3rem',
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
                    fontSize: active ? '1.6rem' : '1.3rem',
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
                <div className="past_simulation_tab_table_name_heading">
                  NAME
                </div>
                <div className="past_simulation_tab_table_heading">P. NO</div>
                <div className="past_simulation_tab_table_heading">SCORE</div>
                <div className="past_simulation_tab_table_heading_repeat"></div>
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
                        <div
                          id="past_simulation_tab_table_name_data_first_phrase"
                          onClick={() => fillArrayOfClickedSimulation(data)}
                        >
                          {data.date}: {data.time} - {data.area}
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
                      <div
                        className="past_simulation_tab_repeat_btn"
                        onClick={() => fillArrayOfClickedSimulation(data)}
                      >
                        REPEAT
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
                        <div
                          id="past_simulation_tab_table_name_data_first_phrase"
                          onClick={() => fillArrayOfClickedSimulation(data)}
                        >
                          {data.date}: {data.time} - {data.area}
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
                      <div
                        className="past_simulation_tab_repeat_btn"
                        onClick={() => fillArrayOfClickedSimulation(data)}
                      >
                        REPEAT
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <SingleSimulation toggle={toggle} setToggle={setToggle} />
          </div>
        </div>
      </animated.div>

      <Footer footerNumber={1} />
    </div>
  );
}
