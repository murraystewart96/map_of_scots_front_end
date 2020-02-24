
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
    })
  }



  handleGenderFilter(event){
    let fileteredScots = [];
    for(let i = 0; i < this.state.scots.length; i++){
      if(this.state.scots[i].gender === event.target.value){
        fileteredScots.push(this.state.scots[i])
      }
    }

    this.setState({scots: fileteredScots})
  }


  handleDeadOrAlive(event){
    let fileteredScots = [];

    if(event.target.value === "dead"){
      for(let i = 0; i < this.state.scots.length; i++){
        if(this.state.scots[i].dateOfDeath !== ""){
          fileteredScots.push(this.state.scots[i])
        }
      }
    }else{
      for(let i = 0; i < this.state.scots.length; i++){
        if(this.state.scots[i].dateOfDeath === ""){
          fileteredScots.push(this.state.scots[i])
        }
      }
    }
    this.setState({scots: fileteredScots})
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
