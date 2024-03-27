import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import '../renderer/App.css';
import mainMenu from '../TACSIM-img/main_menu.svg';
import backButton from '../TACSIM-img/back_button.svg';
import Footer from '../utility/Footer';
import plus from '../TACSIM-img/plus.svg';

export default function SelectStudentAndInstructor() {
  const springs = useSpring({
    from: { x: 2000, y: 80 },
    to: { x: 0 },
    delay: 200,
  });

  const [toggle, setToggle] = useState(false);
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    'pa No.': '',
    rank: '',
    unit: '',
  });
  const [instructorDetails, setInstructorDetails] = useState({
    'pa No.': '',
    rank: '',
    name: '',
    unit: '',
  });

  const handleInputChange = (field, value, isStudent) => {
    if (isStudent) {
      setStudentDetails((prev) => ({ ...prev, [field]: value }));
    } else {
      setInstructorDetails((prev) => ({ ...prev, [field]: value }));
    }
  };

  const studentTabStyle = {
    opacity: !toggle ? 1 : 0,
    maxHeight: !toggle ? '100%' : '0',
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
  };

  const instructorTabStyle = {
    opacity: toggle ? 1 : 0,
    maxHeight: toggle ? '100%' : '0',
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
  };

  return (
    <div className="main_class" style={{ backgroundImage: `url(${mainMenu})` }}>
      <NavLink className="navigation_button" to="/">
        <span id="first_span_navigation_button">
          <img src={backButton} alt="back" /> MAIN MENU /
        </span>
        <span id="second_span_navigation_button">ADD USER</span>
      </NavLink>

      <animated.div style={springs}>
        <div className="select_student_instructor_main_content_container">
          <div className="select_student_instructor_main_content">
            <div className="select_student_instructor_tabs_button">
              <div
                className="select_student_instructor_tab_button"
                onClick={() => setToggle(false)}
                style={{
                  background: !toggle && 'rgba(255, 255, 255, 0.2)',
                  fontWeight: !toggle ? '700' : '500',
                  transition: 'background 0.2s ease-in-out',
                }}
              >
                STUDENT
              </div>
              <div
                className="select_student_instructor_tab_button"
                onClick={() => setToggle(true)}
                style={{
                  background: toggle && 'rgba(255, 255, 255, 0.2)',
                  fontWeight: toggle ? '700' : '500',
                  transition: 'background 0.2s ease-in-out',
                }}
              >
                INSTRUCTOR
              </div>
            </div>

            <div className="tabs_container">
              <div
                className="select_student_instructor__tab_content"
                style={studentTabStyle}
              >
                {Object.keys(studentDetails).map((key) => (
                  <div
                    key={key}
                    className="select_student_instructot_tab_input_container"
                  >
                    <span>{key.toUpperCase()}</span>
                    <input
                      value={studentDetails[key]}
                      onChange={(e) =>
                        handleInputChange(key, e.target.value, true)
                      }
                    />
                  </div>
                ))}
              </div>

              <div
                className="select_student_instructor__tab_content"
                style={instructorTabStyle}
              >
                {Object.keys(instructorDetails).map((key) => (
                  <div
                    key={key}
                    className="select_student_instructot_tab_input_container"
                  >
                    <span>{key.toUpperCase()}</span>
                    <input
                      value={instructorDetails[key]}
                      onChange={(e) =>
                        handleInputChange(key, e.target.value, false)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <NavLink
            to="/add_batch_user"
            className="btn_plus"
            style={{ right: '563px', top: '475px' }}
          >
            <img src={plus} alt="plus" />
            <span>ADD GROUP OF STUDENTS</span>
          </NavLink>
        </div>
      </animated.div>

      <Footer />
    </div>
  );
}
