import React, { Component } from "react";
import {
  LayersControl,
  Map,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import { PlottyGeotiffLayer, GeotiffLayer } from "./GeotiffLayer";
import { Item } from "./SiderMenu";
import "leaflet/dist/leaflet.css";
import "../styles/Osm.less";

const { Overlay, BaseLayer } = LayersControl;

type State = {
  lat: number;
  lng: number;
  zoom: number;
};

type Props = {
  selectedMenuItem: Item;
};

interface Osm {
  tiffRef: React.RefObject<GeotiffLayer>;
}

class Osm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.tiffRef = React.createRef();
  }

  state = {
    lat: 59.8873,
    lng: 29.1103,
    zoom: 11,
  };

  render() {
    const position = [this.state.lat, this.state.lng];

    const hydroLayerOptions = {
      name: "Water level",
      rendererOptions: {
        displayMin: 1,
        displayMax: 259,
        colorScale: "portland",
      },
      band: 1,
      pane: "overlayPane",
    };

    const reliefLayerOptions = {
      name: "Relief Layer",
      rendererOptions: {
        displayMin: 1,
        displayMax: 254,
        colorScale: "earth",
      },
      band: 1,
      pane: "overlayPane",
    };

    const renderTiffLayer = (item: Item) => {
      console.log(item);
      return item !== Item.topography ? (
        <Overlay name={item.toString()}>
          <PlottyGeotiffLayer
            layerRef={this.tiffRef}
            options={
              item === Item.hydro ? hydroLayerOptions : reliefLayerOptions
            }
            url={`http://localhost:8000/${Item[item]}.tif`}
          />
        </Overlay>
      ) : null;
    };

    return (
      <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}>
        <LayersControl position="topright">
          <BaseLayer checked name={Item.topography.toString()}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          {renderTiffLayer(this.props.selectedMenuItem)}
          {/* {this.props.selectedMenuItem === Item.hydro
            ? renderTiffLayer(Item.relief)
            : renderTiffLayer(Item.hydro)} */}

          {/* <Marker position={[this.state.lat, this.state.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        </LayersControl>
      </Map>
    );
  }
}

export default Osm;
