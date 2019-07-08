import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Row, Col, Form } from "react-bootstrap";
import { inject } from "mobx-react";

class MarkerControlModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      long: "",
      lat: "",
      title: "",
      id: new Date().getUTCMilliseconds(),
      updateState: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addEditMarker = this.addEditMarker.bind(this);
  }

  setIntitalState() {
    this.setState({
      long: "",
      lat: "",
      title: "",
      id: new Date().getUTCMilliseconds(),
      updateState: false
    });
  }
  componentDidMount() {}

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
      long: self.state.long,
      lat: self.state.lat,
      title: self.state.title
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
      this.setState({
        long: marker.long,
        lat: marker.lat,
        title: marker.title,
        id: marker.id,
        updateState: true
      });
    }
  }

  render() {
    return (
      <Modal show={this.props.showControlModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set New Marker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formGridAddress1">
              <Form.Label>Marker Title</Form.Label>
              <Form.Control
                autoComplete="off"
                placeholder="e.g. Leipzig"
                value={this.state.title}
                onChange={event => {
                  this.setState({ title: event.target.value });
                }}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  autoComplete="off"
                  value={this.state.lat}
                  onChange={event => {
                    this.setState({ lat: event.target.value });
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  autoComplete="off"
                  value={this.state.long}
                  onChange={event => {
                    this.setState({ long: event.target.value });
                  }}
                />
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.addEditMarker}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default inject("markersStore")(MarkerControlModal);
