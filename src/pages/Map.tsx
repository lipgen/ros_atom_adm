import React, { useState } from "react";
import "../styles/Map.less";
import Header from "../components/Header";
import Osm from "../components/Osm";
import SiderMenu, { Item } from "../components/SiderMenu";

function Map() {
  const [mapState, setMapState] = useState(Item.topography);

  function changeMapState(item: Item) {
    setMapState(item);
  }

  return (
    <>
      <div className="map flex-container flex-column">
        <div className="m-one">
          <Header />
        </div>
        <div className="m-two"></div>
        <div className="m-three flex-container flex-row">
          <div className="m-three-sub-one">
            <SiderMenu onItemClick={changeMapState} selectedItem={mapState} />
          </div>
          <div className="m-three-sub-two">
            <Osm selectedMenuItem={mapState} selectMenuItem={changeMapState}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Map;
