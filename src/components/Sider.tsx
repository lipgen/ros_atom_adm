import React from 'react';
import {MenuOutlined} from '@ant-design/icons';
import RosAtomLogo from '../RosAtomLogo';
import '../styles/Sider.less';

function Sider() {
    return (
        <div className='sider flex-container flex-row'>
            <div className='flex-container flex-column'>
                <div style={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                }}>
                    <span className='menu-title'>
                        ЭС ОГР
                    </span>
                </div>
                <div className='menu-icon'>
                    <span>
                        <MenuOutlined />
                    </span>
                </div>
            </div>
            <div style={{
                boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.1)',
                padding: '10px 0',
                background: '#fff',
            }}>
                <RosAtomLogo style={{
                    width: '100px',
                    height: '75px',
                    backgroundSize: 'contain',
                }} light />
            </div>
        </div>
    )
}

export default Sider
