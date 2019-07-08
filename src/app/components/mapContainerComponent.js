import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import MapSettings from "../core/mapSettings";

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={MapSettings.ini_zoom}
        style={MapSettings.style}
        initialCenter={{
          lat: MapSettings.ini_lat,
          lng: MapSettings.ini_lang
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: MapSettings.api_key
})(MapContainer);
