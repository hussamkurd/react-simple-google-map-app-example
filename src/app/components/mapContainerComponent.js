import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import MapSettings from "../core/mapSettings";
import { inject, observer } from "mobx-react";

const MapContainer = inject("markersStore")(
  observer(
    class MapContainerComponent extends Component {
      constructor(props) {
        super(props);
        this.state = {
          showingInfoWindow: false,
          activeMarker: {},
          selectedPlace: {},
          title: "",
          passProps: {
            globals: this.props.globals,
            stores: this.props.stores
          }
        };
        this.displayMarkers = this.displayMarkers.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onClose = this.onClose.bind(this);
        this.showInfoWindow = this.showInfoWindow.bind(this);
      }

      onMarkerClick = (props, marker, e, title) => {
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true,
          title: title
        });
      };

      onClose = props => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null,
            title: ""
          });
        }
      };

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
              title={item.title}
              onClick={this.onMarkerClick}
            />
          );
        });
      };

      showInfoWindow() {
        return (
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h1>{this.state.title}</h1>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        );
      }



      render() {
        return (
          <Map
            google={this.props.google}
            zoom={MapSettings.ini_zoom}
            style={MapSettings.style}
            onReady={this.fetchPlaces}

            initialCenter={{
              lat: MapSettings.ini_lat,
              lng: MapSettings.ini_lang
            }}
          >
            {this.displayMarkers()}
            {this.showInfoWindow()}
          </Map>
        );
      }
    }
  )
);

export default GoogleApiWrapper({
  apiKey: MapSettings.api_key
})(MapContainer);
