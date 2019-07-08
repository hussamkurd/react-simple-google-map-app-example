import React, { Component } from "react";
import "./App.css";

import AppContainer from "./app/AppContainer";
import  MarkersStoreController  from "./app/controllers/markersStoreController";
import { Provider } from 'mobx-react'


const markersStore = new MarkersStoreController();

export default class App extends Component {
  render() {
    return (
      <Provider markersStore={markersStore}>
        <AppContainer />
      </Provider>
    );
  }
}
