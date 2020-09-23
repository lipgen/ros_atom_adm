import React from 'react'
import '../styles/App.less';
import MainMenu from './MainMenu';

function Header() {
    return (
        <div className='header flex-container'>
            <div className='section one'>
                <MainMenu />
            </div>
            <div className='section two'></div>
        </div>
    )
}

export default Header
