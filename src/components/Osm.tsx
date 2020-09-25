import React, { Component } from 'react'
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

type State = {
  lat: number,
  lng: number,
  zoom: number,
}

export default class Osm extends Component<{}, State> {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    console.log('position', position);
    
    return (
      <Map center={[50, -1]} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[50, -1]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    )
  }
}