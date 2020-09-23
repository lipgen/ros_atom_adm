import React from 'react'
import '../styles/App.less';

function MainMenu() {
    return (
        <div className='main-menu flex-container'>
            <div className='section one'>
                <div className='subsection'>
                    <span>
                        ОЦЕНКА РИСКА ПОДТОПЛЕНИЯ
                    </span>
                </div>
                <div className='subsection'>
                    <span>
                        ОЦЕНКА РИСКОВ ЗАГРЯЗНЕНИЯ ГРУНОВЫХ ВОД
                    </span>
                </div>
                <div className='subsection'>
                    <span>
                        ООЦЕНКА РИСКОВ ВОЗНИКНОВЕНИЯ НЕБЛАГОПРИЯТНЫХ ПОСЛЕДСТВИЙ СВЯЗАННЫХ С КАЧЕСТВОМ ПОДЗЕМНЫХ ВОД ТЕРРИТОРИИ
                    </span>
                </div>
            </div>
            <div className='section two'></div>
        </div>
    )
}

export default MainMenu
