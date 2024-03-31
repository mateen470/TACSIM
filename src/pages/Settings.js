import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../renderer/App.css';
import { useSpring, animated } from 'react-spring';
import mainMenu from '../TACSIM-img/main_menu.svg';
import backButton from '../TACSIM-img/back_button.svg';
import Footer from '../utility/Footer';
import blue_shade from '../TACSIM-img/blu_shade.svg';
import pc from '../TACSIM-img/pc.svg';
import pen from '../TACSIM-img/pen.svg';
import plus from '../TACSIM-img/plus.svg';

export default function Settings() {
  const [softwareArray, setSoftwareArray] = useState([]);
  const [hardwareArray, setHardwareArray] = useState([]);
  const [selectedPC, setSelectedPC] = useState(null);
  const [active, setActive] = useState(false);

  const fadeIn = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 500 },
  });
  const springs = useSpring({
    from: { x: 2000, y: 105 },
    to: { x: 0 },
    delay: 200,
  });

  const trainingStyle = {
    opacity: !active ? 1 : 0,
    height: active && '0px',
    overflow: 'hidden',
    transition: 'opacity 0.6s ease-in-out',
  };
  const recentStyle = {
    opacity: active ? 1 : 0,
    height: !active && '0px',
    overflow: 'hidden',
    transition: 'opacity 0.6s ease-in-out',
  };

  const handleSelectedPC = (pcData, groupIndex, PCindex) => {
    setHardwareArray(pcData.hardwareDetails);
    setSoftwareArray(pcData.softwareDetails);
    setSelectedPC({ groupIndex, PCindex });
  };

  const restartPC = () => {
    console.log(selectedPC);
  };

  const [systems, setSystems] = useState([
    {
      connectedSystems: [
        {
          pcName: '1-a',
          softwareDetails: [
            {
              name: 'Game Engine',
              status: 'operational',
            },
            {
              name: 'Game Engine',
              status: 'down',
            },
            {
              name: 'Game Engine',
              status: 'not connected',
            },
          ],
          hardwareDetails: [
            {
              name: 'Game',
              status: 'down',
            },
            {
              name: 'Game',
              status: 'operational',
            },
            {
              name: 'Game',
              status: 'not connected',
            },
          ],
        },
        {
          pcName: '1-b',
          softwareDetails: [
            {
              name: 'Game Engine',
              status: 'not connected',
            },
            {
              name: 'Game Engine',
              status: 'operational',
            },
            {
              name: 'Game Engine',
              status: 'down',
            },
          ],
          hardwareDetails: [
            {
              name: 'Game',
              status: 'down',
            },
            {
              name: 'Game',
              status: 'operational',
            },
            {
              name: 'Game',
              status: 'not connected',
            },
          ],
        },
        {
          pcName: '1-c',
          softwareDetails: [
            {
              name: 'Game Engine',
              status: 'down',
            },
            {
              name: 'Game Engine',
              status: 'operational',
            },
            {
              name: 'Game Engine',
              status: 'not connected',
            },
          ],
          hardwareDetails: [
            {
              name: 'Game',
              status: 'down',
            },
            {
              name: 'Game',
              status: 'operational',
            },
            {
              name: 'Game',
              status: 'not connected',
            },
          ],
        },
      ],
    },
  ]);

  const deleteSelectedPC = () => {
    if (!selectedPC) {
      return;
    }

    setSystems((prevSystems) => {
      return prevSystems.map((group, groupIndex) => {
        if (groupIndex === selectedPC.groupIndex) {
          const updatedConnectedSystems = [...group.connectedSystems];
          updatedConnectedSystems[selectedPC.PCindex] = null;
          return { ...group, connectedSystems: updatedConnectedSystems };
        }
        return group;
      });
    });

    setSoftwareArray([]);
    setHardwareArray([]);
    setSelectedPC(null);
  };

  const addNewPC = () => {
    setSystems((prevSystems) => {
      let added = false;
      const updatedSystems = prevSystems.map((group, groupIndex) => {
        if (!added) {
          const nullIndex = group.connectedSystems.findIndex(
            (pc) => pc === null,
          );
          const groupName = String.fromCharCode('A'.charCodeAt(0) + groupIndex);
          const pcName =
            nullIndex !== -1
              ? `${groupIndex + 1}-${String.fromCharCode(
                  'A'.charCodeAt(0) + nullIndex,
                )}`
              : `${groupIndex + 1}-${String.fromCharCode(
                  'A'.charCodeAt(0) + group.connectedSystems.length,
                )}`;

          const newPC = {
            pcName: pcName,
            softwareDetails: [],
            hardwareDetails: [],
          };

          if (nullIndex !== -1) {
            group.connectedSystems[nullIndex] = newPC;
            added = true;
          } else if (group.connectedSystems.length < 3) {
            group.connectedSystems.push(newPC);
            added = true;
          }
        }
        return group;
      });

      if (!added && updatedSystems.length < 8) {
        const groupName = String.fromCharCode(
          'A'.charCodeAt(0) + updatedSystems.length,
        );
        const newPC = {
          pcName: `${updatedSystems.length + 1}-A`,
          softwareDetails: [],
          hardwareDetails: [],
        };
        updatedSystems.push({
          connectedSystems: [newPC],
        });
      }

      return updatedSystems;
    });
  };

  return (
    <div className="main_class" style={{ backgroundImage: `url(${mainMenu})` }}>
      <animated.div style={fadeIn}>
        <img src={blue_shade} className="blue_shade_bg" alt="blue shade" />
      </animated.div>

      <NavLink className="navigation_button" to="/">
        <span id="first_span_navigation_button">
          <img src={backButton} alt="back" /> MAIN MENU /
        </span>
        <span id="second_span_navigation_button">SETTINGS</span>
      </NavLink>

      <animated.div style={springs}>
        <div className="settings_main_container">
          <div className="computer_modules_main_container">
            <div className="connected_sys_heading">CONNECTED SYSTEMS</div>

            <div className="computer_modules_section">
              {systems.map((computer, index) => {
                return (
                  <div className="computer_module_group_of_3" key={index}>
                    {computer.connectedSystems.map((pcData, pcIndex) => {
                      let pcClass = 'computer_module fade-in';

                      if (pcData === null) {
                        return (
                          <div
                            key={pcIndex}
                            className={pcClass}
                            style={{ visibility: 'hidden', width: '108.69px' }}
                          ></div>
                        );
                      }

                      return (
                        <div
                          className={pcClass}
                          key={pcIndex}
                          onClick={() =>
                            handleSelectedPC(pcData, index, pcIndex)
                          }
                        >
                          <img src={pc} alt="computer" />
                          <div className="computer_module_name">
                            <span>TABLE {pcData.pcName}</span>
                            <img src={pen} alt="pen" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="computer_modules_btn_main_container">
              <div className="btn_plus computer_module_btn" onClick={addNewPC}>
                <img src={plus} alt="plus" />
                <span>ADD PC</span>
              </div>
              <div
                className="btn_plus computer_module_btn"
                onClick={deleteSelectedPC}
              >
                <img src={plus} alt="plus" style={{ rotate: '45deg' }} />
                <span>DELETE PC</span>
              </div>
              <div className="btn_plus computer_module_btn" onClick={restartPC}>
                <span style={{ marginLeft: '0.8rem' }}>RESTART PC</span>
              </div>
            </div>
          </div>

          <div className="test_mode_main_content_container">
            <div className="test_mode_heading">TEST MODE</div>

            <div className="test_mode_tab_heading__box">
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
                SOFTWARE
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
                HARDWARE
              </div>
            </div>

            <div className="test_mode_tab_table">
              <div className="test_mode_tab_table_heading_container">
                <div className="test_mode_tab_table_name_heading">NAME</div>
                <div className="test_mode_tab_table_name_heading">STATUS</div>
              </div>

              <div style={trainingStyle}>
                {softwareArray.map((data, index) => {
                  return (
                    <div
                      className="test_mode_tab_table_data_container "
                      key={index}
                    >
                      <div className="test_mode_tab_table_data">
                        {data.name}
                      </div>
                      <div
                        className="test_mode_tab_table_data"
                        style={{
                          color:
                            data.status === 'Operational' ||
                            data.status === 'operational' ||
                            data.status === 'OPERATIONAL'
                              ? '#1AD336'
                              : data.status === 'down' ||
                                data.status === 'Down' ||
                                data.status === 'DOWN'
                              ? '#BF1413'
                              : '#FAFF1B',
                        }}
                      >
                        {data.status}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={recentStyle}>
                {hardwareArray.map((data, index) => {
                  return (
                    <div
                      className="test_mode_tab_table_data_container"
                      key={index}
                    >
                      <div className="test_mode_tab_table_data">
                        {data.name}
                      </div>
                      <div
                        className="test_mode_tab_table_data"
                        style={{
                          color:
                            data.status === 'Operational' ||
                            data.status === 'operational' ||
                            data.status === 'OPERATIONAL'
                              ? '#1AD336'
                              : data.status === 'down' ||
                                data.status === 'Down' ||
                                data.status === 'DOWN'
                              ? '#BF1413'
                              : '#FAFF1B',
                        }}
                      >
                        {data.status}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </animated.div>

      <Footer />
    </div>
  );
}
