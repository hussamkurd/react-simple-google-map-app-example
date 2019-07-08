import React, { Component } from "react";
import "./App.css";

import AppContainer from "./app/AppContainer";
import markersStore from "./app/controllers/markersStoreController";
import { Provider } from "mobx-react";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passProps: {
        globals: {},
        stores: {}
      }
    };
  }
  refreshGlobal(state) {
    this.setState(state);
  }
  render() {
    return (
      <Provider markersStore={markersStore}>
        <AppContainer {...this.state.passProps} />
      </Provider>
    );
  }
}
