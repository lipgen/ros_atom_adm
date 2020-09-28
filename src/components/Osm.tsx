import React, { Component } from 'react'
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type State = {
  lat: number,
  lng: number,
  zoom: number,
}

export default class Osm extends Component<{}, State> {
  state = {
    lat: 59.8873,
    lng: 29.1103,
    zoom: 11,
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    console.log('position', position);
    
    return (
      <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[this.state.lat, this.state.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </Map>
    )
  }
}