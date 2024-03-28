import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import '../renderer/App.css';
import Footer from '../utility/Footer';
import mainMenu from '../TACSIM-img/main_menu.svg';
import backButton from '../TACSIM-img/back_button.svg';
import plus from '../TACSIM-img/plus.svg';
import blue_shade from '../TACSIM-img/blu_shade.svg';

export default function AddBatchUsers() {
  const springs = useSpring({
    from: { x: -2000, y: 10 },
    to: { x: 0 },
    delay: 200,
  });

  const fadeIn = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const [addBatchUsers, setAddBatchUsers] = useState([
    {
      PA_NO: '',
      RANK: '',
      NAME: '',
      UNIT: '',
      ROLL_NO: '',
    },
  ]);

  const handleUserInput = (index, field, value) => {
    const updatedUsers = [...addBatchUsers];
    updatedUsers[index][field] = value;
    setAddBatchUsers(updatedUsers);
  };

  const addMoreUsers = () => {
    setAddBatchUsers([
      ...addBatchUsers,
      {
        PA_NO: '',
        RANK: '',
        NAME: '',
        UNIT: '',
        ROLL_NO: '',
      },
    ]);
  };

  return (
    <div className="main_class" style={{ backgroundImage: `url(${mainMenu})` }}>
      <animated.div style={fadeIn}>
        <img src={blue_shade} className="blue_shade_bg" alt="blue shade" />
      </animated.div>

      <NavLink className="navigation_button_with_bigger_width_1" to="/add_user">
        <span id="first_span_navigation_button">
          <img src={backButton} alt="back" /> ADD USER /
        </span>
        <span id="second_span_navigation_button">ADD BATCH USERS</span>
      </NavLink>

      <animated.div style={springs}>
        <div className="add_batch_user_table_main_container">
          <div className="add_batch_user_table_content">
            <div className="add_batch_user_table_head">
              <span>PA NO.</span>
              <span>RANK</span>
              <span>NAME</span>
              <span>UNIT</span>
              <span>ROLL NO.</span>
            </div>

            <div className="add_batch_user_table_body">
              {addBatchUsers.map((user, index) => (
                <div className="add_batch_user_table_body_row" key={index}>
                  {Object.keys(user).map((key) => (
                    <input
                      key={key}
                      style={{
                        borderRight:
                          key === 'ROLL_NO' ? 'none' : '2px solid #dae3eb69',
                      }}
                      value={user[key]}
                      onChange={(e) =>
                        handleUserInput(index, key, e.target.value)
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="btn_plus"
          onClick={addMoreUsers}
          style={{ right: '240px', bottom: '-65px' }}
        >
          <img alt="plus" src={plus} />
          <span>ADD MORE</span>
        </div>
      </animated.div>

      <Footer />
    </div>
  );
}
