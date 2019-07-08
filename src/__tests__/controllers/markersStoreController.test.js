import MarkersStoreController from "../../app/controllers/markersStoreController";
let MarkersStoreControllerObject = new MarkersStoreController();
let markerData = {
  'title': 'test marker title',
  'id': 1,
  'lang': '51.0557036',
  'lat': '48.5518083'
}
//test

test("Test add marker to the markers", () => {
  let newMarker = MarkersStoreControllerObject.addMarker(markerData);
  expect(newMarker.title).toBe(markerData.title);
});

test("Test get marker by id", () => {
  let marker = MarkersStoreControllerObject.getMarkerByID(markerData.id);
  expect(marker.title).toBe(markerData.title);
});

test("Test get all markers", () => {
  let markers = MarkersStoreControllerObject.getAllMarkers();
  expect(markers.length).toBeGreaterThan(0);
});

test("Test update marker", () => {
  let marker = MarkersStoreControllerObject.getMarkerByID(markerData.id);
  let newTitle = "new marker title";
  marker.title = newTitle
  MarkersStoreControllerObject.editMarker(marker);
  let updatedMarker = MarkersStoreControllerObject.getMarkerByID(markerData.id);
  expect(updatedMarker.title).toBe(newTitle);
});

test("Test delete marker", () => {
  MarkersStoreControllerObject.deleteMarker(markerData.id);
  let marker = MarkersStoreControllerObject.getMarkerByID(markerData.id);
  expect(marker).toBeFalsy();
});
