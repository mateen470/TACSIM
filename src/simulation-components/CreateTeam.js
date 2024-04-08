import '../renderer/App.css';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import RankDropDown from '../utility/RankDropDown';

export default function CreateTeam() {
  const [toggle, setToggle] = useState(true);
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

  const [team, setTeam] = useState({
    studentArray: [
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
      {
        teamName: 'TP-3',
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
    ],
    enemyArray: [
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
      {
        teamName: 'TP-3',
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
    ],
  });

  const handlePlayerRankChange = (teamIndex, playerIndex, value) => {
    const updatedTeams = { ...team };
    updatedTeams.studentArray[teamIndex].teamPlayers[
      playerIndex
    ].teamPlayerRank = value;
    setTeam(updatedTeams);
  };
  const handleEnemyPlayerRankChange = (teamIndex, playerIndex, value) => {
    const updatedTeams = { ...team };
    updatedTeams.enemyArray[teamIndex].teamPlayers[playerIndex].teamPlayerRank =
      value;
    setTeam(updatedTeams);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === 'names' && destination.droppableId === 'names') {
      const reorderedNames = reorder(names, source.index, destination.index);
      setNames(reorderedNames);
      return;
    }

    if (toggle) {
      if (
        source.droppableId.startsWith('student-teamPlayer') &&
        destination.droppableId === 'names'
      ) {
        const srcTeamIndex = parseInt(source.droppableId.split('-')[2], 10);
        const srcPlayerIndex = parseInt(source.droppableId.split('-')[3], 10);
        const sourceName =
          team.studentArray[srcTeamIndex].teamPlayers[srcPlayerIndex]
            .teamPlayerName;

        team.studentArray[srcTeamIndex].teamPlayers[
          srcPlayerIndex
        ].teamPlayerName = '';

        const updatedNames = [{ playerName: sourceName }, ...names];

        setNames(updatedNames);
        setTeam({ ...team, studentArray: [...team.studentArray] });
      } else if (
        source.droppableId === 'names' &&
        destination.droppableId.startsWith('student-teamPlayer')
      ) {
        const destTeamIndex = parseInt(
          destination.droppableId.split('-')[2],
          10,
        );
        const destPlayerIndex = parseInt(
          destination.droppableId.split('-')[3],
          10,
        );
        const draggedName = names[source.index].playerName;

        const destinationName =
          team.studentArray[destTeamIndex].teamPlayers[destPlayerIndex]
            .teamPlayerName;
        team.studentArray[destTeamIndex].teamPlayers[
          destPlayerIndex
        ].teamPlayerName = draggedName;

        let updatedNames = [...names.filter((_, idx) => idx !== source.index)];
        if (destinationName) {
          updatedNames = [{ playerName: destinationName }, ...updatedNames];
        }

        setNames(updatedNames);
        setTeam({ ...team, studentArray: [...team.studentArray] });
      } else if (
        source.droppableId.startsWith('student-teamPlayer') &&
        destination.droppableId.startsWith('student-teamPlayer')
      ) {
        const srcTeamIndex = parseInt(source.droppableId.split('-')[2], 10);
        const srcPlayerIndex = parseInt(source.droppableId.split('-')[3], 10);
        const destTeamIndex = parseInt(
          destination.droppableId.split('-')[2],
          10,
        );
        const destPlayerIndex = parseInt(
          destination.droppableId.split('-')[3],
          10,
        );

        const sourceName =
          team.studentArray[srcTeamIndex].teamPlayers[srcPlayerIndex]
            .teamPlayerName;
        team.studentArray[srcTeamIndex].teamPlayers[
          srcPlayerIndex
        ].teamPlayerName =
          team.studentArray[destTeamIndex].teamPlayers[
            destPlayerIndex
          ].teamPlayerName;
        team.studentArray[destTeamIndex].teamPlayers[
          destPlayerIndex
        ].teamPlayerName = sourceName;

        setTeam({ ...team, studentArray: [...team.studentArray] });
      }
    } else if (!toggle) {
      if (
        source.droppableId.startsWith('enemy-teamPlayer') &&
        destination.droppableId === 'names'
      ) {
        const srcTeamIndex = parseInt(source.droppableId.split('-')[2], 10);
        const srcPlayerIndex = parseInt(source.droppableId.split('-')[3], 10);
        const sourceName =
          team.enemyArray[srcTeamIndex].teamPlayers[srcPlayerIndex]
            .teamPlayerName;

        team.enemyArray[srcTeamIndex].teamPlayers[
          srcPlayerIndex
        ].teamPlayerName = '';

        const updatedNames = [{ playerName: sourceName }, ...names];

        setNames(updatedNames);
        setTeam({ ...team, enemyArray: [...team.enemyArray] });
      } else if (
        source.droppableId === 'names' &&
        destination.droppableId.startsWith('enemy-teamPlayer')
      ) {
        const destTeamIndex = parseInt(
          destination.droppableId.split('-')[2],
          10,
        );
        const destPlayerIndex = parseInt(
          destination.droppableId.split('-')[3],
          10,
        );
        const draggedName = names[source.index].playerName;

        const destinationName =
          team.enemyArray[destTeamIndex].teamPlayers[destPlayerIndex]
            .teamPlayerName;
        team.enemyArray[destTeamIndex].teamPlayers[
          destPlayerIndex
        ].teamPlayerName = draggedName;

        let updatedNames = [...names.filter((_, idx) => idx !== source.index)];
        if (destinationName) {
          updatedNames = [{ playerName: destinationName }, ...updatedNames];
        }

        setNames(updatedNames);
        setTeam({ ...team, enemyArray: [...team.enemyArray] });
      } else if (
        source.droppableId.startsWith('enemy-teamPlayer') &&
        destination.droppableId.startsWith('enemy-teamPlayer')
      ) {
        const srcTeamIndex = parseInt(source.droppableId.split('-')[2], 10);
        const srcPlayerIndex = parseInt(source.droppableId.split('-')[3], 10);
        const destTeamIndex = parseInt(
          destination.droppableId.split('-')[2],
          10,
        );
        const destPlayerIndex = parseInt(
          destination.droppableId.split('-')[3],
          10,
        );

        const sourceName =
          team.enemyArray[srcTeamIndex].teamPlayers[srcPlayerIndex]
            .teamPlayerName;
        team.enemyArray[srcTeamIndex].teamPlayers[
          srcPlayerIndex
        ].teamPlayerName =
          team.enemyArray[destTeamIndex].teamPlayers[
            destPlayerIndex
          ].teamPlayerName;
        team.enemyArray[destTeamIndex].teamPlayers[
          destPlayerIndex
        ].teamPlayerName = sourceName;

        setTeam({ ...team, enemyArray: [...team.enemyArray] });
      }
    }
  };

  const dropenemy = {
    display: !toggle ? 'block' : 'none',
    transition: 'all 0.4s ease-in-out',
  };

  const dropStudents = {
    display: toggle ? 'block' : 'none',
    transition: 'all 0.4s ease-in-out',
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="create_team_main_container">
        <div className="create_team_main_content">
          <div className="create_team_tabs">
            <div
              className="create_team_tab"
              onClick={() => setToggle(true)}
              style={{
                color: toggle ? '#ffffff' : '#465463',
                fontWeight: toggle ? '700' : '500',
              }}
            >
              DROP STUDENTS
            </div>
            <div
              className="create_team_tab"
              onClick={() => setToggle(false)}
              style={{
                color: !toggle ? '#ffffff' : '#465463',
                fontWeight: !toggle ? '700' : '500',
              }}
            >
              DROP ENEMY
            </div>
          </div>

          <div className="create_team_box" style={dropStudents}>
            {team.studentArray.map((teamData, teamIndex) => (
              <div className="team_box" key={teamIndex}>
                {teamData.teamPlayers.map((teamPlayer, playerIndex) => (
                  <div className="team_player_box" key={playerIndex}>
                    <Droppable
                      droppableId={`student-teamPlayer-${teamIndex}-${playerIndex}`}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {teamPlayer.teamPlayerName ? (
                            <Draggable
                              draggableId={`student-drag-${teamIndex}-${playerIndex}`}
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

                    <RankDropDown
                      teamIndex={teamIndex}
                      playerIndex={playerIndex}
                      teamPlayer={teamPlayer}
                      handlePlayerRankChange={handlePlayerRankChange}
                    />
                  </div>
                ))}
                <div className="team_name">{teamData.teamName}</div>
              </div>
            ))}
          </div>

          <div className="create_team_box" style={dropenemy}>
            {team.enemyArray.map((teamData, teamIndex) => (
              <div className="team_box" key={teamIndex}>
                {teamData.teamPlayers.map((teamPlayer, playerIndex) => (
                  <div className="team_player_box" key={playerIndex}>
                    <Droppable
                      droppableId={`enemy-teamPlayer-${teamIndex}-${playerIndex}`}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {teamPlayer.teamPlayerName ? (
                            <Draggable
                              draggableId={`enemy-drag-${teamIndex}-${playerIndex}`}
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

                    <RankDropDown
                      teamIndex={teamIndex}
                      playerIndex={playerIndex}
                      teamPlayer={teamPlayer}
                      handlePlayerRankChange={handleEnemyPlayerRankChange}
                    />
                  </div>
                ))}
                <div className="team_name">{teamData.teamName}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="create_team_main_content">
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
      </div>
    </DragDropContext>
  );
}
