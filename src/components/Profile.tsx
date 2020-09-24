import React from 'react';
import '../styles/Profile.less';

function Profile() {
    return (
        <div className='profile flex-container flex-row'>
            <div className='avatar'></div>
            <div className='details flex-container flex-column'>
                <span>Воропаев Сергей Валерьевич</span>
                <span>Должность</span>
            </div>
        </div>
    )
}

export default Profile
