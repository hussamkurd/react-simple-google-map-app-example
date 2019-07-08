import {decorate, observable, action} from "mobx"

class MarkersStoreController {
  markers = [];

  /**
  initiate the contellers
  **/
  constructor() {
    let self = this;
    self.markers = [];
  }

  _setMarkerData(marker) {
    return {
      id: marker.id,
      title: marker.title,
      long: marker.long,
      lat: marker.lat
    };
  }
  addMarker(markerData) {
    var marker = this._setMarkerData(markerData);
    this.markers.push(marker);
    return marker;
  }
  getMarkerByID(id) {
    let marker = this.markers.filter(l => {
      return l.id == id;
    });
    if (marker) return marker[0];
    else return false;
  }
  getAllMarkers(){
    return this.markers
  }
  editMarker(markerData) {
    let self = this;
    self.markers.forEach(function(l, index) {
      if (l.id === markerData.id) {
        var marker = self._setMarkerData(markerData);
        this[index] = marker;
      }
    }, self.markers);
  }

  deleteMarker(id) {
    this.markers = this.markers.filter(l => {
      return l.id !== id;
    });
  }
}
decorate(MarkersStoreController, {
  markers: observable,

  addMarker: action,
  editMarker: action,
  deleteMarker: action

})
const markersStoreController = new MarkersStoreController()
export default markersStoreController
