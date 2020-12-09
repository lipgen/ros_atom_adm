import React, { Component } from "react";
import L, { LeafletMouseEvent } from "leaflet";
import { LayersControl, Map, TileLayer, Marker, Tooltip, GeoJSON, GeoJSONProps, Circle } from "react-leaflet";
import {
  GeotiffLayer,
  PlottyGeotiffLayer,
  GeotiffOptions,
} from "./GeotiffLayer";
import { Item, getKeyByValueFromItem } from "./SiderMenu";
import "leaflet/dist/leaflet.css";
import "../styles/Osm.less";
import { getDataFromLayer, loadJSON } from "../utils";
import { Modal, Button, List, Typography, Divider } from 'antd';

const { Overlay, BaseLayer } = LayersControl;

L.Icon.Default.imagePath = "img/";

const getLayerOptions = (item: Item): GeotiffOptions => {
  switch (item) {
    case Item.hydro:
      return {
        name: "Water level",
        rendererOptions: {
          clampLow: false,
          displayMin: 1,
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
          clampLow: false,
          displayMin: 1,
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
          clampLow: false,
          displayMin: 1,
          displayMax: 255,
          colorScale: "earth",
        },
        band: 1,
        pane: "overlayPane",
      };
    default:
      return { rendererOptions: {} };
  }
};

type SelectedPoint = {
  lat: number;
  lng: number;
  value: number | null | undefined;
  dialog?: boolean;
}

type State = {
  lat: number;
  lng: number;
  zoom: number;
  selectedPoint: SelectedPoint | null;
  geoJsonData: Object | null
  regionData: Object | null,
  isRegionModalVisible: boolean,
  regionTitle: string,
  isResultCircleVisible: boolean,
};

type Props = {
  selectedMenuItem: Item;
  selectMenuItem: (item: Item) => void;
};

interface Osm {
  overlayRef: React.RefObject<GeotiffLayer>;
}

const mapLinksMock = [
  {item: Item.hydro, name: getKeyByValueFromItem(Item.hydro)},
  {item: Item.relief, name: getKeyByValueFromItem(Item.relief)}
];

const defaultMapCoordinates = {
  lat: 64.95,
  lng: 92.64,
  zoom: 3
};

const SpbLo = {
  lat: 59.975,
  lng: 29.583,
  zoom: 7,
};

class Osm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.overlayRef = React.createRef();
  }

  state = {
    ...defaultMapCoordinates,
    selectedPoint: null as {
      lat: number;
      lng: number;
      value: number | null | undefined;
      dialog: boolean;
    } | null,
    geoJsonData: [] as GeoJSON.GeoJsonObject[],
    regionData: [] as GeoJSON.GeoJsonObject[],
    isRegionModalVisible: false,
    regionTitle: '',
    isResultCircleVisible: false
  };

  onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: this.clickToFeature.bind(this)
    });
  }

  clickToFeature = (e: any) => {
     var layer = e.target;
     this.setState({
       lat: e.latlng.lat,
       lng: e.latlng.lng,
       zoom: 8,
       regionTitle: layer.feature.properties.local_name || layer.feature.properties.name
     });
     this.showRegionModal();
     console.log(e);
  }

  setSelectedPoint(
    point: SelectedPoint | null
  ) {
    this.setState({ selectedPoint: point, isResultCircleVisible: false });
  }

  showRegionModal = () => {
    if(this.state.regionTitle && this.state.regionData.length > 0) {
     this.setState({ isRegionModalVisible: true });
    }
  }

  handleRegionModalChoose = (item: Item) => {
    this.setState({ isRegionModalVisible: false });
    this.props.selectMenuItem(item);
  }

  handleRegionModalCancel = () => {
    this.setState({ isRegionModalVisible: false, ...defaultMapCoordinates });
  }

  showResultCircle = () => {
    const { selectedPoint } = this.state;
    // center to selected point and close dialog after
    if (selectedPoint?.lat && selectedPoint?.lng) this.setState({
      lat: selectedPoint.lat,
      lng: selectedPoint.lng,
      zoom: 9,
      selectedPoint: {
        ...selectedPoint,
        dialog: false,
      }
    });
    this.setState({ isResultCircleVisible: true });
    this.props.selectMenuItem(Item.inds_pd);
  }

  componentDidMount() {
    loadJSON('http://localhost:8000/cadastr.geojson', (data: GeoJSON.GeoJsonObject) => {
      this.setState({ geoJsonData: [data] });
    });

    loadJSON('http://localhost:8000/adm/lenobl.geojson', (data: GeoJSON.GeoJsonObject) => {
      this.setState({regionData: [data]})
    })
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.state.selectedPoint &&
      this.props.selectedMenuItem !== prevProps.selectedMenuItem &&
      this.props.selectedMenuItem !== Item.inds_pd
    ) {
      this.setSelectedPoint(null);
    }
    if (this.props.selectedMenuItem === Item.topography && this.props.selectedMenuItem !== prevProps.selectedMenuItem) {
      this.setState({...defaultMapCoordinates});
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const currentItem = this.props.selectedMenuItem;
    const currentItemName = getKeyByValueFromItem(currentItem);

    const roundCoordinate = (coordinate: number) => {
      return Number(coordinate).toFixed(4);
    };

    return (
      <>
        <Map
          center={[this.state.lat, this.state.lng]}
          zoom={this.state.zoom}
          onClick={(event: LeafletMouseEvent) => {
            const value = getDataFromLayer(event.latlng, this.overlayRef.current);
            this.setSelectedPoint({ ...event.latlng, value, dialog: true });
          }}
        >
          <LayersControl position="topright">
            <BaseLayer checked name={Item.topography.toString()}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </BaseLayer>

            {currentItem === Item.topography && this.state.regionData.length > 0 ? (
                <GeoJSON key="region" data={this.state.regionData} onEachFeature={this.onEachFeature}/>
              ) : null }

            <Overlay name={currentItem.toString()}>
              {
                currentItem !== Item.topography
                  // permanently hidden
                  // && currentItem !== Item.cadastr
                  ? (
                <PlottyGeotiffLayer
                  layerRef={this.overlayRef}
                  options={getLayerOptions(currentItem)}
                  url={`http://localhost:8000/${currentItemName}.tif`}
                />
              ) : null}            
            </Overlay>

            {/* permanently hidden*/}
            {/*{currentItem === Item.cadastr && this.state.geoJsonData.length > 0 ? (*/}
            {/*    <GeoJSON key="cadastr" data={this.state.geoJsonData}/>*/}
            {/*  ) : null }*/}

            {this.state.selectedPoint && currentItem !== Item.topography ? (
              <Marker
                position={[
                  this.state.selectedPoint.lat,
                  this.state.selectedPoint.lng,
                ]}
                onclick={(e) => {
                  e.originalEvent.stopPropagation(); 
                  e.originalEvent.preventDefault();
                  this.showResultCircle();
                }}
              >
                {this.state.selectedPoint.dialog && <Tooltip permanent interactive>
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
                    <Button>Сделать расчёт</Button>
                  </div>
                </Tooltip>}
              </Marker>
            ) : (
              ""
            )}
            {this.state.selectedPoint && this.state.isResultCircleVisible ? (
              <Circle
                center={this.state.selectedPoint}
                radius={15000}
              />
            ) : ''}

          </LayersControl>
        </Map>
        <Modal
          title={this.state.regionTitle}
          visible={this.state.isRegionModalVisible}
          onCancel={this.handleRegionModalCancel}
          footer={[
            <Button key="back" onClick={this.handleRegionModalCancel}>Отмена</Button>
          ]}
        >
          <List
            dataSource={mapLinksMock}
            renderItem={ item => <List.Item onClick={() => this.handleRegionModalChoose(item.item)}>{ item.item }</List.Item>}
          />
        </Modal>
      </>
    );
  }
}

export default Osm;
