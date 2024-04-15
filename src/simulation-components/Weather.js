import React from 'react';
import { useSpring, animated } from 'react-spring';
import DropDown from '../utility/DropDown';
import '../renderer/App.css';
import Clock from '../utility/Clock';

export default function Weather({
  options1,
  options2,
  selectedWeather,
  setSelectedWeather,
  selectedWeatherCondition,
  setSelectedWeatherCondition,
  temperature,
  setTemperatureState,
  windSpeed,
  setWindSpeedState,
  visibility,
  setVisibility,
  intensity,
  setIntensity,
  setWindDirection,
}) {
  const springs = useSpring({
    from: { x: 2000 },
    to: { x: 0 },
    delay: 200,
  });

  const handleWeather = (option) => {
    setSelectedWeather(option);
  };

  const handleWeatherCondition = (option) => {
    setSelectedWeatherCondition(option);
  };

  const handleTemperatureChange = (event) => {
    const value = Number(event.target.value);
    setTemperatureState(value);
  };

  const handleWindSpeedChange = (event) => {
    const value = Number(event.target.value);
    setWindSpeedState(value);
  };

  const handleVisibilityChange = (event) => {
    const value = Number(event.target.value);
    setVisibility(value);
  };

  const handleIntensity = (event) => {
    const value = Number(event.target.value);
    setIntensity(value);
  };

  return (
    <div className="select_weather_main_class">
      <div className="page_heading">WEATHER</div>
      <animated.div style={springs}>
        <div className="select_weather_main_content_container">
          <div className="temperature_wind_speed_main_class">
            <div className="temperature_main_class">
              <span>AMBIENT TEMPERATURE</span>
              <div className="progress_bar_and_value_main_container">
                <div className="progress_bar_container">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={temperature}
                    className="progress_bar"
                    onChange={handleTemperatureChange}
                  />
                </div>
                <div className="progress_bar_value_box">
                  <input
                    type="number"
                    value={temperature}
                    onChange={handleTemperatureChange}
                  />
                  {'\u00b0'}C
                </div>
              </div>
            </div>
            <div className="wind_speed_main_class">
              <span>WIND SPEED</span>
              <div className="progress_bar_and_value_main_container">
                <div className="progress_bar_container">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={windSpeed}
                    className="progress_bar"
                    onChange={handleWindSpeedChange}
                  />
                </div>
                <div className="progress_bar_value_box">
                  <input
                    type="number"
                    value={windSpeed}
                    onChange={handleWindSpeedChange}
                  />
                  knots
                </div>
              </div>
            </div>
          </div>

          <div className="wind_direction_main_class">
            <div className="wind_direction_container">
              <span>WIND DIRECTION</span>
              <div className="clock_wind_direction">
                <Clock setWindDirection={setWindDirection} />
              </div>
            </div>
          </div>

          <div className="select_weather_dropdown_main_class">
            <div className="select_dropdown" style={{ zIndex: 10 }}>
              <span>TIME OF DAY</span>
              <DropDown
                options={options1}
                selected={selectedWeather}
                onOptionSelect={handleWeather}
              />
            </div>
          </div>

          <div className="select_weather_dropdown_main_class">
            <div className="select_dropdown" style={{ zIndex: 9 }}>
              <span>WEATHER CONDITION</span>
              <DropDown
                options={options2}
                selected={selectedWeatherCondition}
                onOptionSelect={handleWeatherCondition}
              />
            </div>
          </div>

          <div className="temperature_wind_speed_main_class">
            <div className="temperature_main_class">
              <span>WEATHER INTENSITY</span>
              <div className="progress_bar_and_value_main_container">
                <div className="progress_bar_container">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={intensity}
                    className="progress_bar"
                    onChange={handleIntensity}
                  />
                </div>
                <div className="progress_bar_value_box">
                  <input
                    type="number"
                    value={intensity}
                    onChange={handleIntensity}
                  />
                  %
                </div>
              </div>
            </div>
            <div className="wind_speed_main_class">
              <span>VISIBILITY</span>
              <div className="progress_bar_and_value_main_container">
                <div className="progress_bar_container">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={visibility}
                    className="progress_bar"
                    onChange={handleVisibilityChange}
                  />
                </div>
                <div className="progress_bar_value_box">
                  <input
                    type="number"
                    value={visibility}
                    onChange={handleVisibilityChange}
                  />
                  %
                </div>
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
}
