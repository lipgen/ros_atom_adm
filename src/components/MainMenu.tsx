import React from "react";
import "../styles/App.less";

function MainMenu() {
  return (
    <div className="main-menu flex-container flex-row">
      <div className="section">
        <span className="item">ОЦЕНКА РИСКА ПОДТОПЛЕНИЯ</span>
      </div>
      <div className="section">
        <span className="item">ОЦЕНКА РИСКОВ ЗАГРЯЗНЕНИЯ ГРУНОВЫХ ВОД</span>
      </div>
      <div className="section">
        <span className="item">
          ОЦЕНКА РИСКОВ ВОЗНИКНОВЕНИЯ НЕБЛАГОПРИЯТНЫХ ПОСЛЕДСТВИЙ СВЯЗАННЫХ С
          КАЧЕСТВОМ ПОДЗЕМНЫХ ВОД ТЕРРИТОРИИ
        </span>
      </div>
    </div>
  );
}

export default MainMenu;
