import React from 'react';
import { useSpring, animated } from 'react-spring';
import DropDown from '../utility/DropDown';
import '../renderer/App.css';

export default function Difficulty({
  options,
  selectedDifficultyLevel,
  setSelectedDifficultyLevel,
}) {
  const fadeIn = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const handleDifficultyLevel = (option) => {
    setSelectedDifficultyLevel(option);
  };

  return (
    <div className="select_difficulty_main_class">
      <div className="page_heading">DIFFICULTY</div>
      <animated.div style={fadeIn}>
        <div className="select_difficulty_dropdown_main_class">
          <div className="select_dropdown" style={{ zIndex: 2 }}>
            <span>SELECT DIFFICULTY</span>
            <DropDown
              options={options}
              selected={selectedDifficultyLevel}
              onOptionSelect={handleDifficultyLevel}
            />
          </div>
        </div>
      </animated.div>
    </div>
  );
}
