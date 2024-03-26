import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import '../renderer/App.css';
import mainMenu from '../TACSIM-img/main_menu.svg';
import backButton from '../TACSIM-img/back_button.svg';
import Footer from '../utility/Footer';
import Modal from '../utility/Modal';
import playButton from '../TACSIM-img/playVideoButton.svg';
import tutorialBackground from '../TACSIM-img/tutorialBackground.svg';

export default function Tutorials() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const fadeIn = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const videos = [
    {
      title: 'HOW TO START A SIMULATION?',
      url: 'https://www.youtube.com/embed/video-id-1',
    },
    {
      title: 'HOW EVALUATION WORKS?',
      url: 'https://www.youtube.com/embed/video-id-1',
    },
    {
      title: 'ADVANCED BATTLE PRACTICE?',
      url: 'https://www.youtube.com/embed/video-id-1',
    },
    {
      title: 'TACTICAL SIMULATOR OVERVIEW',
      url: 'https://www.youtube.com/embed/video-id-1',
    },
    {
      title: 'CREATING A MAP?',
      url: 'https://www.youtube.com/embed/video-id-1',
    },
  ];

  const openModal = (video) => {
    setSelectedVideo(video);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="main_class" style={{ backgroundImage: `url(${mainMenu})` }}>
      <NavLink className="navigation_button" to="/">
        <span id="first_span_navigation_button">
          <img src={backButton} alt="back" /> MAIN MENU /
        </span>
        <span id="second_span_navigation_button">TUTORIALS</span>
      </NavLink>
      <animated.div style={fadeIn}>
        <div className="tutorials_main_content">
          {videos.map((video, index) => (
            <div
              key={index}
              className="tutorial_video_box"
              style={{ backgroundImage: `url(${tutorialBackground})` }}
              onClick={() => openModal(video)}
            >
              <img src={playButton} alt="Play" className="play-icon" />
              <div className="tutorial_video_title">
                <div className="video_title_watch_span">WATCH</div>
                <div className="video_title">{video.title}</div>
              </div>
            </div>
          ))}
        </div>
      </animated.div>

      <Modal isOpen={modalIsOpen} closeModal={closeModal}>
        {selectedVideo && (
          <iframe
            className="iFrame_video_player"
            title={selectedVideo.title}
            src={selectedVideo.url}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        )}
      </Modal>

      <Footer />
    </div>
  );
}
