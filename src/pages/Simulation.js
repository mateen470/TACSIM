import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../renderer/App.css';
import { useSpring, animated } from 'react-spring';
import CreateTeam from '../simulation-components/CreateTeam';
import mainMenu from '../TACSIM-img/main_menu.svg';
import backButton from '../TACSIM-img/back_button.svg';
import Footer from '../utility/Footer';
import blue_shade from '../TACSIM-img/blu_shade.svg';
import Difficulty from '../simulation-components/Difficulty';
import Weather from '../simulation-components/Weather';
import Verify from '../simulation-components/Verify';
import SelectMap from '../simulation-components/SelectMap';

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

  // CREATE TEAM STATES-START
  const [team, setTeam] = useState({
    studentArray: [
      {
        teamName: '1st Tp',
        teamPlayers: [
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
        ],
      },
      {
        teamName: '2nd Tp',
        teamPlayers: [
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
        ],
      },
      {
        teamName: '3rd Tp',
        teamPlayers: [
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
        ],
      },
      {
        teamName: '4th Tp',
        teamPlayers: [
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
        ],
      },
      {
        teamName: 'MIB',
        teamPlayers: [
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
        ],
      },
      {
        teamName: 'HAT / LAT',
        teamPlayers: [
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
        ],
      },
      {
        teamName: 'SQUAD COMMANDER',
        teamPlayers: [
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
        ],
      },
      {
        teamName: '2IC',
        teamPlayers: [
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
        ],
      },
    ],
    enemyArray: [
      {
        teamName: '1st Tp',
        teamPlayers: [
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
        ],
      },
      {
        teamName: '2nd Tp',
        teamPlayers: [
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
        ],
      },
      {
        teamName: '3rd Tp',
        teamPlayers: [
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
        ],
      },
      {
        teamName: '4th Tp',
        teamPlayers: [
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
        ],
      },
      {
        teamName: 'MIB',
        teamPlayers: [
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
        ],
      },
      {
        teamName: 'HAT / LAT',
        teamPlayers: [
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
        ],
      },
      {
        teamName: 'SQUAD COMMANDER',
        teamPlayers: [
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
        ],
      },
      {
        teamName: '2IC',
        teamPlayers: [
          {
            teamPlayerName: '',
            teamPlayerRank: '',
          },
        ],
      },
    ],
  });

  const [names, setNames] = useState([
    { playerName: 'ALI' },
    { playerName: 'AHMED' },
    { playerName: 'ABDULLAH' },
    { playerName: 'NOUMAN' },
    { playerName: 'UMAIR' },
    { playerName: 'KHAN' },
    { playerName: 'RAJU' },
    { playerName: 'BHEEM' },
    { playerName: 'GOKU' },
    { playerName: 'GIRIN' },
  ]);
  // CREATE TEAM STATES-END

  // DIFFICULTY STATES-START
  const options = ['EASY', 'MEDIUM', 'DIFFICULT'];
  const [selectedDifficultyLevel, setSelectedDifficultyLevel] = useState(
    options[0],
  );
  // DIFFICULTY STATES-END

  // WEATHER STATES-START
  const options1 = ['DAWN', 'DUSK', 'NIGHT'];
  const options2 = ['RAIN', 'SUNNY', 'CLOUDY'];
  const [selectedWeather, setSelectedWeather] = useState(options1[0]);
  const [selectedWeatherCondition, setSelectedWeatherCondition] = useState(
    options2[0],
  );
  const [temperature, setTemperatureState] = useState(60);
  const [windSpeed, setWindSpeedState] = useState(40);
  const [visibility, setVisibility] = useState(20);
  const [intensity, setIntensity] = useState(30);
  const [windDirection, setWindDirection] = useState(12);
  // WEATHER STATES-END

  // VERIFY STATES-START
  const verifyArray = [
    {
      instrcutor: 'Imtiaz',
      student: 'Ali',
      mapName: 'MUDDY FOREST',
      mapSpecs: [
        { specName: 'Area', specValue: '2000 sq/m' },
        { specName: 'Difficulty', specValue: 'Easy' },
        { specName: 'No. of enemies', specValue: '25 Vehicles' },
        { specName: 'Windspeed', specValue: '8.5 km/h' },
        { specName: 'Wind Direction', specValue: '150 O' },
        { specName: 'Temperature', specValue: '30 Celsius ' },
        { specName: 'Season', specValue: 'Summer ' },
        { specName: 'Fire Interval', specValue: '20 seconds ' },
      ],
    },
  ];
  const [verifyPageArray, setVerifyPageArray] = useState(verifyArray);
  // VERIFY STATES-END

  // SELECT MAP-START
  const mapDetailArray = [
    { name: 'MUDDY FOREST', area: 2000 },
    { name: 'SNOWY CAPS', area: 2000 },
    { name: 'DESSERT MAIN', area: 2000 },
  ];
  const [mapDetail, setMapDetail] = useState(mapDetailArray);
  // SELECT MAP-END

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
          {activeMenuItem === 'SELECT STUDENT' ? (
            <CreateTeam
              team={team}
              setTeam={setTeam}
              names={names}
              setNames={setNames}
            />
          ) : activeMenuItem === 'DIFFICULTY' ? (
            <Difficulty
              options={options}
              selectedDifficultyLevel={selectedDifficultyLevel}
              setSelectedDifficultyLevel={setSelectedDifficultyLevel}
            />
          ) : activeMenuItem === 'SELECT MAP' ? (
            <SelectMap mapDetail={mapDetail} />
          ) : activeMenuItem === 'WEATHER' ? (
            <Weather
              options1={options1}
              options2={options2}
              selectedWeather={selectedWeather}
              setSelectedWeather={setSelectedWeather}
              selectedWeatherCondition={selectedWeatherCondition}
              setSelectedWeatherCondition={setSelectedWeatherCondition}
              temperature={temperature}
              setTemperatureState={setTemperatureState}
              windSpeed={windSpeed}
              setWindSpeedState={setWindSpeedState}
              visibility={visibility}
              setVisibility={setVisibility}
              intensity={intensity}
              setIntensity={setIntensity}
              windDirection={windDirection}
              setWindDirection={setWindDirection}
            />
          ) : activeMenuItem === 'VERIFY' ? (
            <Verify verifyPageArray={verifyPageArray} />
          ) : (
            'PAGE NOT FOUND!'
          )}
        </div>

        <Footer footerNumber={2} />
      </div>
    </div>
  );
}
