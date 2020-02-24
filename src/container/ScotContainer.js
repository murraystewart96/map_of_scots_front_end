
import React, {Component, Fragment} from 'react';
import Request from '../helpers/request';
import OccupationList from '../component/OccupationList'
import MapContainer from  './MapContainer'
import {Marker} from 'google-maps-react';



class ScotContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      occupations: [],
      selectedOccupation: "",
      scots: [],
      markers: []
    }

    this.handleSelectOccupation = this.handleSelectOccupation.bind(this);
  }


  handleSelectOccupation(occupation){
    this.setState({selectedOccupation: occupation});
    const request = new Request();

    request.get('/api/scots/' + occupation)
    .then((data) => {
      this.setState({scots: data})

      // const tempMarkers = this.state.scots.map((scot, index) => {
      //   const spaceIndex = scot.coord.indexOf(" ");
      //   const coord1 = scot.coord.slice(0, spaceIndex);
      //   const coord2 = scot.coord.slice(spaceIndex + 1 , scot.coord.length-1);
      //   console.log(scot.coord);
      //   console.log(coord1);
      //   console.log(coord2);
      //   return <Marker name={scot['name']}
      //   dateOfBirth={scot['dateOfBirth']}
      //   position={{lat: coord2, lng: coord1}}
      //   imageURL = {scot['imageURL']}
      //   onClick={this.handleMarkerClick}
      //   key={index}
      //   />
      // })
      // this.setState({markers: tempMarkers})
    })
  }







  componentDidMount(){
    const request = new Request();

    request.get('/api/occupations')
    .then(data => this.setState({occupations: data}));
  }

  render(){

    return(
      <Fragment>
      <Fragment><MapContainer scots={this.state.scots}/>
      <OccupationList occupations={this.state.occupations} handleSelectOccupation={this.handleSelectOccupation} />
      </Fragment>
      </Fragment>
    )
  }


}

export default ScotContainer;


    //
    // let activeContainer;
    //
    // if(this.state.scots.length > 0 ){
    //   activeContainer = <Fragment><MapContainer scots={this.state.scots}/>
    //   <OccupationList occupations={this.state.occupations} handleSelectOccupation={this.handleSelectOccupation} /></Fragment>
    //
    // }else{
    //   activeContainer = <OccupationList occupations={this.state.occupations} handleSelectOccupation={this.handleSelectOccupation} />
    //
    // }
