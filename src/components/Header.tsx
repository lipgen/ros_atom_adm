import React from 'react'
import '../styles/App.less';
import MainMenu from './MainMenu';
import Profile from './Profile';

function Header() {
    return (
        <div className='header flex-container'>
            {/* for offset from left */}
            <div className='section one'></div>
            <div className='section two'>
                <MainMenu />
            </div>
            <div className='section three'>
                <Profile />
            </div>
        </div>
    )
}

export default Header
