import React, { Component } from "react";
import L, { LeafletMouseEvent } from "leaflet";
import { LayersControl, Map, TileLayer, Marker, Tooltip } from "react-leaflet";
import {
  GeotiffLayer,
  PlottyGeotiffLayer,
  GeotiffOptions,
} from "./GeotiffLayer";
import { Item } from "./SiderMenu";
import "leaflet/dist/leaflet.css";
import "../styles/Osm.less";
import { getDataFromLayer } from "../utils";

const { Overlay, BaseLayer } = LayersControl;

L.Icon.Default.imagePath = "img/";

const getLayerOptions = (item: Item): GeotiffOptions => {
  switch (item) {
    case Item.hydro:
      return {
        name: "Water level",
        rendererOptions: {
          displayMin: 0,
          displayMax: 259,
          colorScale: "portland",
        },
        band: 1,
        pane: "overlayPane",
      };
    case Item.relief:
      return {
        name: "Relief Layer",
        rendererOptions: {
          displayMin: 0,
          displayMax: 254,
          colorScale: "earth",
        },
        band: 1,
        pane: "overlayPane",
      };
    case Item.inds_pd:
      return {
        name: "Intersection Layer",
        rendererOptions: {
          displayMin: 1,
          displayMax: 5,
          colorScale: "viridis",
        },
        band: 1,
        pane: "overlayPane",
      };
    default:
      return { rendererOptions: {} };
  }
};

type State = {
  lat: number;
  lng: number;
  zoom: number;
  selectedPoint: {
    lat: number;
    lng: number;
  } | null;
};

type Props = {
  selectedMenuItem: Item;
};

interface Osm {
  overlayRef: React.RefObject<GeotiffLayer>;
}

class Osm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.overlayRef = React.createRef();
  }

  state = {
    lat: 59.8873,
    lng: 29.1103,
    zoom: 11,
    selectedPoint: null as {
      lat: number;
      lng: number;
      value: number | null | undefined;
    } | null,
  };

  setSelectedPoint(
    point: { lat: number; lng: number; value: number | null | undefined } | null
  ) {
    this.setState({ selectedPoint: point });
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.state.selectedPoint &&
      this.props.selectedMenuItem !== prevProps.selectedMenuItem
    )
      this.setSelectedPoint(null);
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const currentItem = this.props.selectedMenuItem;
    const currentItemName: string = Item[currentItem];

    const roundCoordinate = (coordinate: number) => {
      return Number(coordinate).toFixed(4);
    };

    return (
      <Map
        center={[this.state.lat, this.state.lng]}
        zoom={this.state.zoom}
        onclick={(event: LeafletMouseEvent) => {
          const value = getDataFromLayer(event.latlng, this.overlayRef.current);
          this.setSelectedPoint({ ...event.latlng, value });
          console.log("event", event);
        }}
      >
        <LayersControl position="topright">
          <BaseLayer checked name={Item.topography.toString()}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>

          <Overlay name={currentItem.toString()}>
            {currentItem !== Item.topography ? (
              <PlottyGeotiffLayer
                layerRef={this.overlayRef}
                options={getLayerOptions(currentItem)}
                url={`http://localhost:8000/${currentItemName}.tif`}
              />
            ) : null}
          </Overlay>

          {this.state.selectedPoint && currentItem !== Item.topography ? (
            <Marker
              position={[
                this.state.selectedPoint.lat,
                this.state.selectedPoint.lng,
              ]}
            >
              <Tooltip permanent>
                <div className="point-data">
                  <div className="point-data__coordinates">
                    {`Координаты: [${roundCoordinate(
                      this.state.selectedPoint.lat
                    )}, ${roundCoordinate(this.state.selectedPoint.lng)}]`}
                  </div>
                  <div className="point-data__value">
                    {`Значение: ${
                      this.state.selectedPoint.value
                        ? this.state.selectedPoint.value
                        : "0"
                    }`}
                  </div>
                </div>
              </Tooltip>
            </Marker>
          ) : (
            ""
          )}
        </LayersControl>
      </Map>
    );
  }
}

export default Osm;
