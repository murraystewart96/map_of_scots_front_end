
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
      selectedGender:"",
      scots: [],
      selectedScots: [],
      markers: []
    }

    this.handleSelectOccupation = this.handleSelectOccupation.bind(this);
    this.handleGenderFilter = this.handleGenderFilter.bind(this);
  }


  handleSelectOccupation(occupation){
    this.setState({selectedOccupation: occupation});
    const request = new Request();

    request.get('/api/scots/' + occupation)
    .then((data) => {
      this.setState({scots: data});
      this.setState({selectedScots: this.state.scots})
    })

  }


  handleGenderFilter(event){

    this.setState({selectedGender: event})
    this.setState({scots: this.state.selectedScots}, () => {
      let filteredScots = [];
      
      for(let i = 0; i < this.state.scots.length; i++){
        if(this.state.scots[i].gender === event){
          filteredScots.push(this.state.scots[i])
        }

    }  //reset list
    this.setState({scots: filteredScots})

    })
  }


  handleDeadOrAlive(event){
    let filteredScots = [];

    if(event.target.value === "dead"){
      for(let i = 0; i < this.state.scots.length; i++){
        if(this.state.scots[i].dateOfDeath !== ""){
          filteredScots.push(this.state.scots[i])
        }
      }
    }else{
      for(let i = 0; i < this.state.scots.length; i++){
        if(this.state.scots[i].dateOfDeath === ""){
          filteredScots.push(this.state.scots[i])
        }
      }
    }
    this.setState({scots: filteredScots})
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
      <OccupationList
      occupations={this.state.occupations}
      scots={this.state.scots}
      handleSelectOccupation={this.handleSelectOccupation}
      handleGenderFilter={this.handleGenderFilter}
      selectedGender= {this.state.selectedGender} />
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
