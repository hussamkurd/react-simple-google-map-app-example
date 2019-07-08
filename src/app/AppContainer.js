import React, { Component } from "react";
import { inject } from 'mobx-react'

import MapContainer from "./components/mapContainerComponent";
import MarkerList from "./components/markerListComponent";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passProps: {
        globals: this.props.globals,
        stores: this.props.stores
      }
    };
  }

  render() {
    return (
      <div>
        <div id="marker-list-container">
          <MarkerList {...this.state.passProps}/>
        </div>
        <div id="map-container">
          <MapContainer {...this.state.passProps} />
        </div>
      </div>
    );
  }
}

export default inject('markersStore')(AppContainer)
