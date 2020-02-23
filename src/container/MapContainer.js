
import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';



export const MapContainer = (props) => {


    if(props.scots.length === 0){
      return <p>LOADING...</p>
    }

    const markers = props.scots.map((scot, index) => {
      const spaceIndex = scot.coord.indexOf(" ");
      const coord1 = parseFloat(scot.coord.slice(0, spaceIndex));
      const coord2 = parseFloat(scot.coord.slice(spaceIndex + 1 , scot.coord.length));
      console.log(coord1);
      return(<Marker name={scot['name']}
      key={index}
      position={{lat: coord2, lng: coord1}} />)
    })


  return (
    <Map google={props.google} zoom={7}
    initialCenter={{
          lat: 56.95,
          lng: -4.5
        }}
    >
      {markers}

      <InfoWindow onClose={Component.onInfoWindowClose}>
          <div>
          <p>Hello</p>
          </div>
      </InfoWindow>
    </Map>)


}

// export class MapContainer extends Component {
//
//   constructor(props){
//     super(props)
//   }
//
//
//
//   componentDidMount(){
//
//     if(props.scots.length === 0){
//       return <p>LOADING...</p>
//     }
//
//     const markers = this.props.scots.map((scot) => {
//       const spaceIndex = scot.coord.indexOf(" ");
//       const coord1 = scot.coord.slice(0, spaceIndex);
//       const coord2 = scot.coord.slice(spaceIndex + 1 , scot.coord.length-1);
//       console.log(this.scot.coord);
//       console.log(coord1);
//       console.log(coord2);
//       return <Marker name={scot['name']}
//     position={{lat: 37.759703, lng: -122.428093}} />
//     })
//   }
//
//   render() {
//     return (
//       <Map google={this.props.google} zoom={7}
//       initialCenter={{
//             lat: 56.95,
//             lng: -4.5
//           }}
//       >
//
//         <Marker onClick={this.onMarkerClick}
//                 name={'Current location'} />
//
//         <InfoWindow onClose={this.onInfoWindowClose}>
//             <div>
//             <p>Hello</p>
//             </div>
//         </InfoWindow>
//       </Map>
//     );
//   }
// }

export default GoogleApiWrapper({
  apiKey: "AIzaSyDXhwisovJIARugrKYofsVy4-TeTFku_nU"
})(MapContainer)
