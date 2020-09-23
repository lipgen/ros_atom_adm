import React from 'react'
import '../styles/App.less';
import MainMenu from './MainMenu';

function Header() {
    return (
        <div className='header flex-container'>
            {/* for offset from left */}
            <div className='section one'></div>
            <div className='section two'>
                <MainMenu />
            </div>
            <div className='section three'>
                
            </div>
        </div>
    )
}

export default Header
