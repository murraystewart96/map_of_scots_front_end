
import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';



// export const MapContainer = (props) => {
//
//
//     if(props.scots.length === 0){
//       return <p>LOADING...</p>
//     }
//
//     const markerClick = (marker, e) => {
//       props.onMarkerClick(marker);
//     };
//
//     const markers = props.scots.map((scot, index) => {
//       const spaceIndex = scot.coord.indexOf(" ");
//       const coord1 = parseFloat(scot.coord.slice(0, spaceIndex));
//       const coord2 = parseFloat(scot.coord.slice(spaceIndex + 1 , scot.coord.length));
//       console.log(coord1);
//       return(<Marker name={scot['name']}
//       key={index}
//       onClick={markerClick}
//       position={{lat: coord2, lng: coord1}} />)
//     })
//
//
//   return (
//     <Map google={props.google} zoom={7}
//     initialCenter={{
//           lat: 56.95,
//           lng: -4.5
//         }}
//     >
//       {markers}
//
//       <InfoWindow
//             marker={props.activeMarker}
//             visible={props.showingInfoWindow}
//             >
//               <div>
//                 <h1>{props.activeMarker.name}</h1>
//               </div>
//           </InfoWindow>
//
//     </Map>)
//
//
// }




export class MapContainer extends Component {

  constructor(props){
    super(props)

    this.state = {
      activeMarker: {},
      showingInfoWindow: false,
      selectedPlace: {},
      markers: []
    }

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
  }




  componentDidMount(){
    console.log(this.props.scots);
    const tempMarkers = this.props.scots.map((scot, index) => {
      const spaceIndex = scot.coord.indexOf(" ");
      const coord1 = scot.coord.slice(0, spaceIndex);
      const coord2 = scot.coord.slice(spaceIndex + 1 , scot.coord.length-1);
      console.log(scot.coord);
      console.log(coord1);
      console.log(coord2);
      return <Marker name={scot['name']}
      dateOfBirth={scot['dateOfBirth']}
      position={{lat: coord2, lng: coord1}}
      imageURL = {scot['imageURL']}
      onClick={this.handleMarkerClick}
      key={index}
     />
    })

    this.setState({markers: tempMarkers});
  }

  handleMarkerClick = (props, marker, e) => {
    console.log("marker clicked");
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  handleMapClick = (props) =>{
    console.log("map cliked");

    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: {}
      })
    }
  }

  render() {
    if(this.props.scots.length === 0){
      return <p>LOADING...</p>
    }

    return (
      <Map google={this.props.google} zoom={7}
      initialCenter={{
            lat: 56.95,
            lng: -4.5
          }}
          onClick = {this.handleMapClick}
      >

        {this.state.markers}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.activeMarker.name}</h1>
              <h1>{this.state.activeMarker.dateOfBirth}</h1>
              <img src={this.state.activeMarker.imageURL} width="200px" />
            </div>
        </InfoWindow>

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDXhwisovJIARugrKYofsVy4-TeTFku_nU"
})(MapContainer)

// <InfoWindow
//    marker={this.state.activeMarker}
//    visible={this.state.showingInfoWindow}
//    >
//      <div>
//        <h1>{this.state.activeMarker.name}</h1>
//      </div>
//  </InfoWindow>
