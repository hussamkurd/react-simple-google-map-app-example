import React, { Component } from "react";
import "./App.css";

import AppContainer from "./app/AppContainer";
import markersStore from "./app/controllers/markersStoreController";
import { Provider } from "mobx-react";
import helperFunctions from "./app/helpers/functions";
import settings from "./app/core/settings";


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passProps: {
        globals: {
          helperFunctions: helperFunctions
        },
        stores: {
          settings: settings
        }
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
