import React from "react";
import "../styles/Map.less";
import Header from "../components/Header";
import Osm from "../components/Osm";
import SiderMenu from "../components/SiderMenu";

function Map() {
  return (
    <>
      <div className="map flex-container flex-column">
        <div className="m-one">
          <Header />
        </div>
        <div className="m-two"></div>
        <div className="m-three flex-container flex-row">
          <div className="m-three-sub-one">
            <SiderMenu />
          </div>
          <div className="m-three-sub-two">
            <Osm />
          </div>
        </div>
      </div>
    </>
  );
}

export default Map;
