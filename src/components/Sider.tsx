import React from "react";
import MenuIcon from "./MenuIcon";
import RosAtomLogo from "../RosAtomLogo";
import "../styles/Sider.less";

function Sider() {
  return (
    <div className="sider flex-container flex-row">
      <div
        className="flex-container"
        style={{
          justifyContent: "center",
          width: "160px",
        }}
      >
        <div
          style={{
            margin: "0 24px",
            marginTop: "24px",
          }}
        >
          <div className="sider-logo__wrapper">
            <span className="menu-title">ЭС ОГР</span>
            <div className="menu-icon">
              <span>
                <MenuIcon />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.1)",
          background: "#fff",
        }}
      >
        <RosAtomLogo
          style={{
            width: "70px",
            height: "54px",
            margin: "23px 15px",
            backgroundSize: "contain",
          }}
          light
        />
      </div>
    </div>
  );
}

export default Sider;
