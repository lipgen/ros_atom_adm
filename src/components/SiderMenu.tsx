import React from 'react';
import '../styles/SiderMenu.less';

const items = [
    'ТОПОГРАФИЧЕСКАЯ КАРТА',
    'КАРТА С КОСМОСА',
    'ГИДРОГЕОЛОГИЧЕСКАЯ КАРТА ЛИСТА 0-35-VI',
    'РАЗРЕЗ К ГИДРОГЕОЛОГИЧЕСКОЙ КАРТЕ ЛИСТА  0-35-VI',
    'КАРТА ЧЕТВЕРТИЧНЫХ ОТЛОЖЕНИЙ ЛИСТА 0-35-VI',
    'РАЗРЕЗ К КАРТЕ ЧЕТВЕРТИЧНЫХ ОТЛОЖЕНИЙ ЛИСТА 0-35-VI',
    'ГЕОМОРФОЛОГИЧЕСКАЯ КАРТА ЛИСТА 0-35-VI',
]

function SiderMenu() {
    return (
        <div className='sider-menu'>
            <ul className='list'>
                {items.map(
                    (item, i) => <li key={i}>
                        <p className='sider-text'>{item}</p>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default SiderMenu
