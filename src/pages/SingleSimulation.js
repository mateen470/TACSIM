import { useSelector } from 'react-redux';
import backButton from '../TACSIM-img/back_button.svg';
import Modal from '../utility/Modal';
import '../renderer/App.css';
import { useState } from 'react';

export default function SingleSimulation({ setToggle }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const teamArray = useSelector((state) => state.selectedSimulation.team);

  const teamDataToShow =
    teamArray.length > 1 ? [teamArray[teamArray.length - 1]] : teamArray;

  const openModal = (video) => {
    setSelectedVideo(video);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div>
      {teamDataToShow.map((data, index) => {
        return (
          <div
            className="past_simulation_individual_simulation_data"
            key={index}
          >
            <div
              className="back_btn_individual_simulation"
              onClick={() => setToggle(true)}
            >
              <img src={backButton} alt="back" />
            </div>
            <div className="past_simulation_individual_simulation_data_heading">
              <div id="past_simulation_individual_simulation_data_heading_first_phrase">
                {data.date}: {data.time} - {data.area}
              </div>
              <div className="past_simulation_individual_simulation_data_heading_second_phrase">
                <span>INSTRUCTOR : </span> {data.instrcutor}
              </div>
            </div>

            <div className="past_simulation_individual_simulation_data_container">
              {data.team.map((teamData, teamIndex) => {
                return (
                  <div
                    className="past_simulation_individual_simulation_data_row"
                    key={teamIndex}
                  >
                    <div
                      className="past_simulation_individual_simulation_data_row_column"
                      id="past_simulation_individual_simulation_data_row_column_1"
                    >
                      <div className="past_simulation_individual_simulation_data_row_Squad_code">
                        {teamData.teamCode}
                      </div>
                    </div>

                    <div className="past_simulation_individual_simulation_data_row_content_part">
                      <div className="past_simulation_individual_simulation_data_row_column_heading_main_class">
                        <div className="past_simulation_individual_simulation_data_row_column_heading past_simulation_individual_simulation_data_row_column_2">
                          NAME
                        </div>
                        <div className="past_simulation_individual_simulation_data_row_column_heading past_simulation_individual_simulation_data_row_column_3">
                          P. NO
                        </div>
                        <div className="past_simulation_individual_simulation_data_row_column_heading past_simulation_individual_simulation_data_row_column_4">
                          REPORT
                        </div>
                        <div className="past_simulation_individual_simulation_data_row_column_heading past_simulation_individual_simulation_data_row_column_5">
                          VIDEO
                        </div>
                      </div>

                      {teamData.teamPlayer.map((playerInfo, playerIndex) => {
                        return (
                          <div
                            className="team_player_information_in_single_row"
                            key={playerIndex}
                          >
                            <div className="past_simulation_individual_simulation_data_row_column past_simulation_individual_simulation_data_row_column_2">
                              <div className="past_simulation_individual_simulation_data_row_column_data simulation_name">
                                {playerInfo.playerName} - {teamData.teamCode}{' '}
                                {playerInfo.playerRank}
                              </div>
                            </div>

                            <div className="past_simulation_individual_simulation_data_row_column past_simulation_individual_simulation_data_row_column_3">
                              <div className="past_simulation_individual_simulation_data_row_column_data">
                                PA-{playerInfo.playerPNO}
                              </div>
                            </div>

                            <div className="past_simulation_individual_simulation_data_row_column past_simulation_individual_simulation_data_row_column_4">
                              <div
                                className="past_simulation_individual_simulation_data_row_column_data report_video"
                                onClick={() => {
                                  console.log(playerInfo.playerReport);
                                }}
                              >
                                VIEW
                              </div>
                            </div>

                            <div className="past_simulation_individual_simulation_data_row_column past_simulation_individual_simulation_data_row_column_5">
                              <div
                                className="past_simulation_individual_simulation_data_row_column_data report_video"
                                onClick={() =>
                                  openModal(playerInfo.playerVideo)
                                }
                              >
                                PLAY
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <Modal isOpen={modalIsOpen} closeModal={closeModal}>
        {selectedVideo && (
          <iframe
            className="iFrame_video_player"
            src={selectedVideo}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        )}
      </Modal>
    </div>
  );
}
