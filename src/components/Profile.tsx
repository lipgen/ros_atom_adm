import React from 'react';
import {connect} from "react-redux";
import '../styles/Profile.less';
import {AppState} from "../store";

function Profile() {
    return (
        <div className='profile flex-container flex-row'>
            <div className='avatar'></div>
            <div className='details flex-container flex-column'>
                <span>Пользователь А.А.</span>
                <span>Должность</span>
            </div>
        </div>
    )
}

export default connect((state: AppState) => ({
  data: state.session.profile,
}))(Profile);
