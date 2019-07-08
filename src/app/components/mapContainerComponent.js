import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import MapSettings from "../core/mapSettings";
import { inject, observer } from "mobx-react";

const MapContainer = inject("markersStore")(
  observer(
    class MapContainerComponent extends Component {
      constructor(props) {
        super(props);
        this.displayMarkers = this.displayMarkers.bind(this);
      }
      displayMarkers = () => {
        let self = this;
        return self.props.markersStore.markers.slice().map((item, index) => {
          return (
            <Marker
              key={"key" + index + item.id}
              id={"id" + index + item.id}
              position={{
                lat: item.lat,
                lng: item.long
              }}
              onClick={() => console.log("You clicked me!")}
            />
          );
        });
      };

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
          >
            {this.displayMarkers()}
          </Map>
        );
      }
    }
  )
);

export default GoogleApiWrapper({
  apiKey: MapSettings.api_key
})(MapContainer);
