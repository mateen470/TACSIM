import '../renderer/App.css';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function CreateTeam() {
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

  const [team, setTeam] = useState([
    {
      teamName: 'TP-1',
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
      teamName: 'TP-2',
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
  ]);

  const handlePlayerRankChange = (teamIndex, playerIndex, value) => {
    const updatedTeams = [...team];
    updatedTeams[teamIndex].teamPlayers[playerIndex].teamPlayerRank = value;
    setTeam(updatedTeams);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === 'names' && destination.droppableId === 'names') {
      const reorderedNames = reorder(names, source.index, destination.index);
      setNames(reorderedNames);
      return;
    }

    const sourceIndex = source.index;
    if (
      source.droppableId === 'names' &&
      destination.droppableId.startsWith('teamPlayer')
    ) {
      const [_, destTeamIndex, destPlayerIndex] =
        destination.droppableId.split('-');
      const draggedName = names[sourceIndex].playerName;

      const destinationName =
        team[destTeamIndex].teamPlayers[destPlayerIndex].teamPlayerName;

      const updatedTeams = [...team];
      updatedTeams[destTeamIndex].teamPlayers[destPlayerIndex].teamPlayerName =
        draggedName;

      const updatedNames = names.filter((_, index) => index !== sourceIndex);
      let ifPreviousName = { playerName: destinationName };
      destinationName && updatedNames.unshift(ifPreviousName);
      setNames(updatedNames);
      setTeam(updatedTeams);
    } else if (
      source.droppableId.startsWith('teamPlayer') &&
      destination.droppableId === 'names'
    ) {
      const [_, srcTeamIndex, srcPlayerIndex] = source.droppableId.split('-');
      const draggedName =
        team[srcTeamIndex].teamPlayers[srcPlayerIndex].teamPlayerName;

      const updatedTeams = [...team];
      updatedTeams[srcTeamIndex].teamPlayers[srcPlayerIndex].teamPlayerName =
        '';

      setNames([...names, { playerName: draggedName }]);
      setTeam(updatedTeams);
    } else if (
      source.droppableId.startsWith('teamPlayer') &&
      destination.droppableId.startsWith('teamPlayer')
    ) {
      const [_, srcTeamIndex, srcPlayerIndex] = source.droppableId.split('-');
      const [__, destTeamIndex, destPlayerIndex] =
        destination.droppableId.split('-');
      const draggedName =
        team[srcTeamIndex].teamPlayers[srcPlayerIndex].teamPlayerName;

      const updatedTeams = [...team];
      if (
        updatedTeams[destTeamIndex].teamPlayers[destPlayerIndex].teamPlayerName
      ) {
        updatedTeams[srcTeamIndex].teamPlayers[srcPlayerIndex].teamPlayerName =
          updatedTeams[destTeamIndex].teamPlayers[
            destPlayerIndex
          ].teamPlayerName;
      } else {
        updatedTeams[srcTeamIndex].teamPlayers[srcPlayerIndex].teamPlayerName =
          '';
      }

      updatedTeams[destTeamIndex].teamPlayers[destPlayerIndex].teamPlayerName =
        draggedName;
      setTeam(updatedTeams);
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="create_team_main_container">
        <div className="create_team_box">
          {team.map((teamData, teamIndex) => (
            <div className="team_box" key={teamIndex}>
              {teamData.teamPlayers.map((teamPlayer, playerIndex) => (
                <div className="team_player_box" key={playerIndex}>
                  <Droppable
                    droppableId={`teamPlayer-${teamIndex}-${playerIndex}`}
                  >
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {teamPlayer.teamPlayerName ? (
                          <Draggable
                            draggableId={`drag-${teamIndex}-${playerIndex}`}
                            index={0}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`team_player_name ${
                                  snapshot.isDragging ? 'dragging' : ''
                                }`}
                              >
                                <span>{teamPlayer.teamPlayerName}</span>
                              </div>
                            )}
                          </Draggable>
                        ) : (
                          <div className="team_player_name">
                            <span>{teamPlayer.teamPlayerName}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </Droppable>
                  <div className="team_player_rank">
                    <select
                      value={teamPlayer.teamPlayerRank}
                      onChange={(e) =>
                        handlePlayerRankChange(
                          teamIndex,
                          playerIndex,
                          e.target.value,
                        )
                      }
                    >
                      <option value="">Select Rank</option>
                      <option value="Commander">Commander</option>
                      <option value="Soldier">Soldier</option>
                      <option value="Rookie">Rookie</option>
                    </select>
                  </div>
                </div>
              ))}
              <div className="team_name">{teamData.teamName}</div>
            </div>
          ))}
        </div>
        <Droppable droppableId="names">
          {(provided) => (
            <div
              className="create_team_box"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {names.map((data, index) => (
                <Draggable
                  key={index}
                  draggableId={`name-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="name_box"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {data.playerName}
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
