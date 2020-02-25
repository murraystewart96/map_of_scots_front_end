
import React, {Component, useEffect} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Request from '../helpers/request'

const wikiStartpoint = "en.wikipedia.org/w/api.php?action=query&list=search&srsearch="
const wikiEndpoint = "&format=jsonfm"

const wikiURL = "en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles="

export class MapContainer extends Component {

  constructor(props){
    super(props)

    this.state = {
      activeMarker: {},
      showingInfoWindow: false,
      selectedPlace: {},
      markers: [],
      mapCenter: {}
    }

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);

  }

  componentDidMount(){
    console.log(this.props.scots);
    const tempMarkers = this.props.scots.map((scot, index) => {
      const dob = scot.dateOfBirth.slice(0,10);
      const spaceIndex = scot.coord.indexOf(" ");
      const coord1 = scot.coord.slice(0, spaceIndex);
      const coord2 = scot.coord.slice(spaceIndex + 1 , scot.coord.length-1);
      return <Marker name={scot['name']}
      dateOfBirth={dob}
      position={{lat: coord2, lng: coord1}}
      imageURL = {scot['imageURL']}
      onClick={this.handleMarkerClick}
      key={index}
     />
    })


    this.setState({markers: tempMarkers});

  }


  componentDidUpdate(prevProps){
    if (this.props !== prevProps) {
      const tempMarkers = this.props.scots.map((scot, index) => {
        const dob = scot.dateOfBirth.slice(0,10);
        const dod = scot.dateOfDeath.slice(0,10);
        const spaceIndex = scot.coord.indexOf(" ");
        const coord1 = scot.coord.slice(0, spaceIndex);
        const coord2 = scot.coord.slice(spaceIndex + 1 , scot.coord.length-1);
        return <Marker name={scot['name']}
        dateOfBirth={dob}
        dateOfDeath={dod}
        position={{lat: coord2, lng: coord1}}
        imageURL = {scot['imageURL']}
        info = ""
        onClick={this.handleMarkerClick}
        key={index}
       />
      })
      this.setState({markers: tempMarkers});
    }
  }


  handleMarkerClick = (props, marker, e) => {

    console.log(marker.position.lat());

    console.log("marker clicked");
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      mapCenter: {
          lat: marker.position.lat()+1,
          lng: marker.position.lng()
        }
    }, () => {

      let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      let url = wikiURL + this.state.activeMarker.name;

      const request = new Request();
      request.get(proxyUrl + url)
      .then((data) => {
        console.log(data.query.pages[Object.keys(data.query.pages)].extract);
        this.state.activeMarker.info = data.query.pages[Object.keys(data.query.pages)].extract;
        this.setState({activeMarker: this.state.activeMarker})
      })
    });
  }

  handleMapClick = (props) =>{
    console.log("map clicked");

    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: {}
      })
    }
  }

  render() {

    return (
      <Map google={this.props.google} zoom={7}
      initialCenter={{
            lat: 56.95,
            lng: -4.5
          }}
          onClick = {this.handleMapClick}
          center = {this.state.mapCenter}
      >

        {this.state.markers}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h2>{this.state.activeMarker.name}</h2>
              <p>Born: {this.state.activeMarker.dateOfBirth}</p>
              <p>Died: {this.state.activeMarker.dateOfDeath}</p>
              <p>Info: {this.state.activeMarker.info}</p>
              <img className="image" src={this.state.activeMarker.imageURL} />
            </div>
        </InfoWindow>

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDXhwisovJIARugrKYofsVy4-TeTFku_nU"
})(MapContainer)
