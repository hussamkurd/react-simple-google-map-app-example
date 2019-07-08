import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Row, Col, Form } from "react-bootstrap";
import { inject } from "mobx-react";

class MarkerControlModal extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = this._getInitialStateOb();
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addEditMarker = this.addEditMarker.bind(this);
    this.handleValidationWithSubmition = this.handleValidationWithSubmition.bind(
      this
    );
  }
  _getInitialStateOb() {
    return {
      fields: {
        long: "",
        lat: "",
        title: ""
      },
      errors: {},
      passProps: {
        globals: this.props.globals,
        stores: this.props.stores
      },
      id: new Date().getUTCMilliseconds(),
      updateState: false
    };
  }
  setIntitalState() {
    this.setState(this._getInitialStateOb());
  }

  handleValidationWithSubmition() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    const helpers = this.props.globals.helperFunctions;
    //Name
    if (!helpers.checkNotNull(fields["title"])) {
      formIsValid = false;
      errors["title"] = "Title cannot be empty";
    }
    if (!helpers.longlatCheck(fields["lat"])) {
      formIsValid = false;
      errors["lat"] = "Wrong latitude value";
    }
    if (!helpers.longlatCheck(fields["long"])) {
      formIsValid = false;
      errors["long"] = "Wrong longitude value";
    }
    if (formIsValid) {
      this.addEditMarker();
    }
    this.setState({ errors: errors });
  }
  handleClose() {
    this.props.setModalState(false, null);
  }

  handleShow() {
    this.props.setModalState(true, null);
  }

  addEditMarker() {
    let self = this;
    let marker = {
      id: self.state.id,
      long: self.state.fields["long"],
      lat: self.state.fields["lat"],
      title: self.state.fields["title"]
    };
    if (!this.state.updateState) {
      this.props.markersStore.addMarker(marker);
    } else {
      this.props.markersStore.editMarker(marker);
    }
    self.setIntitalState();
    self.handleClose();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.markerID) {
      let marker = this.props.markersStore.getMarkerByID(nextProps.markerID);
      let fields = {};
      fields["long"] = marker.long;
      fields["lat"] = marker.lat;
      fields["title"] = marker.title;

      this.setState({
        fields: fields,
        id: marker.id,
        updateState: true
      });
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  render() {
    return (
      <Modal show={this.props.showControlModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set New Marker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Form.Group controlId="markerTitle">
              <Form.Label>Marker Title</Form.Label>
              <Form.Control
                id="title-input"
                autoComplete="off"
                placeholder="e.g. Leipzig"
                value={this.state.fields["title"]}
                onChange={this.handleChange.bind(this, "title")}
              />
              <span className="invalid">{this.state.errors["title"]}</span>
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="MarkerLatitude">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  id="lat-input"
                  autoComplete="off"
                  value={this.state.fields["lat"]}
                  onChange={this.handleChange.bind(this, "lat")}
                />
                <span className="invalid">{this.state.errors["lat"]}</span>
              </Form.Group>
              <Form.Group as={Col} controlId="MarkerLongitude">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  id="long-input"
                  autoComplete="off"
                  value={this.state.fields["long"]}
                  onChange={this.handleChange.bind(this, "long")}
                />
                <span className="invalid">{this.state.errors["long"]}</span>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={this.handleValidationWithSubmition}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default inject("markersStore")(MarkerControlModal);
