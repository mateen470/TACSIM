import React, { useState, useEffect, useRef } from 'react';
import '../renderer/App.css';

const RankDropDown = ({
  teamIndex,
  playerIndex,
  teamPlayer,
  handlePlayerRankChange,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  const handleSelection = (rank) => {
    handlePlayerRankChange(teamIndex, playerIndex, rank);
    setIsDropdownVisible(false);
  };

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsDropdownVisible(false);
      }
    };
    if (isDropdownVisible) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isDropdownVisible]);

  return (
    <div className="team_player_rank" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="team_player_rank_select">
        {teamPlayer.teamPlayerRank || ''}
      </div>

      {isDropdownVisible && (
        <div className="team_player_rank_menu">
          <div
            className="team_player_rank_menu_item"
            onClick={() => handleSelection('Commander')}
          >
            Commander
          </div>
          <div
            className="team_player_rank_menu_item"
            onClick={() => handleSelection('Soldier')}
          >
            Soldier
          </div>
          <div
            className="team_player_rank_menu_item"
            onClick={() => handleSelection('Rookie')}
          >
            Rookie
          </div>
        </div>
      )}
    </div>
  );
};

export default RankDropDown;
