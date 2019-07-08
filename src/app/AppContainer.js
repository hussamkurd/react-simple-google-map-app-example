import React, { Component } from "react";
import { inject } from 'mobx-react'

import MapContainer from "./components/mapContainerComponent";
import MarkerList from "./components/markerListComponent";

class AppContainer extends Component {
  render() {
    return (
      <div>
        <div id="marker-list-container">
          <MarkerList/>
        </div>
        <div id="map-container">
          <MapContainer />
        </div>
      </div>
    );
  }
}

export default inject('markersStore')(AppContainer)
