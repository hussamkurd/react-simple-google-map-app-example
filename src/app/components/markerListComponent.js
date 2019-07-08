import React, { Component } from "react";
import { inject } from "mobx-react";
import { Button, Row, Container, Card, ButtonToolbar } from "react-bootstrap";
import MarkerControlModal from "./markerControlModalComponent";

class MarkerList extends Component {
  constructor(props, context) {
    super(props, context);
    let self = this;
    this.state = {
      showControlModal: false,
      markerID: null,
      passProps: {
        globals: this.props.globals,
        stores: this.props.stores
      }
    };
    this.setModalState = this.setModalState.bind(this);

  }
  setModalState(state, id) {
    this.setState({
      markerID: id,
      showControlModal: state
    });
  }
  render() {
    let self = this;
    return (
      <Container>
        <Row style={{ padding: 10 }}>
          <MarkerControlModal
            showControlModal={this.state.showControlModal}
            markerID={this.state.markerID}
            setModalState={this.setModalState}
            {...this.state.passProps}
          />
          <Button
            variant="primary"
            className="actn-btn"
            onClick={() => {
              this.setModalState(true, null);
            }}
          >
            Add Marker
          </Button>
        </Row>
        <hr />
        <Row>
          <div id="marker-list-div">
            {this.props.markersStore.getAllMarkers().slice().map(item => (
              <Card className="marker-card mg5" key={"card" + item.id}>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>Longitude: {item.long}</Card.Text>
                  <Card.Text>Latitude: {item.lat}</Card.Text>
                  <hr />
                  <ButtonToolbar>
                    <Button
                      variant="primary"
                      className="actn-btn mg5"
                      onClick={() => {
                        this.setModalState(true, item.id);
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      className="actn-btn mg5"
                      onClick={() => {
                        self.props.markersStore.deleteMarker(item.id);
                        self.setState({ showControlModal: false });

                      }}
                    >
                      Delete
                    </Button>
                  </ButtonToolbar>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Row>
      </Container>
    );
  }
}

export default inject("markersStore")(MarkerList);
