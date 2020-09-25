import React from 'react';
import '../styles/Map.less';
import Header from '../components/Header';
import Sider from '../components/Sider';
import Osm from '../components/Osm';
import SiderMenu from '../components/SiderMenu';

function Map() {
    return (
        <>
            <SiderMenu />
            <div className='map flex-container flex-column'>
                <div className='section one h70-fit'>
                    <Header />
                </div>
                <div className='section two h70-100'>

                </div>
                <div className='section three'>
                    {/* <Osm /> */}
                </div>
            </div>
        </>
    )
}

export default Map
