
import React, {Component, Fragment} from 'react';
import Request from '../helpers/request';
import OccupationList from '../component/OccupationList'
import MapContainer from  './MapContainer'
import {Marker} from 'google-maps-react';
import ReactSearchBox from 'react-search-box'


class ScotContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      occupations: [],
      selectedOccupation: "",
      selectedGender:"",
      scots: [],
      nameObjects: [],
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



  populateSearchBox(){
    const request = new Request();
    request.get('/api/names')
    .then((scots) => {


      let nameObjectArray = []; //array for search box name items
      let previousKey = "";     //storing previous key entry
      let count = 1;            //count keeps track of the number of duplicated names in a sequence

      for(let i = 0; i < scots.length; i++){
        let nameObj = {
          key: "",
          value: ""
        }

        //set current key
        let currentKey = scots[i]['name'].toLowerCase();

        //if current key is unique assign name object values
        if(currentKey !== previousKey){
          nameObj['key'] = currentKey;
          nameObj['value'] = scots[i]['name'] + " : " + scots[i]['occupation'];
          nameObjectArray.push(nameObj)
          count = 1;      //reset duplicate count
      }else{

           let uniqueKeyFound = false;

           //while current key is not unique
           while(uniqueKeyFound == false){

             //add duplicate count number to currentKey
             currentKey = scots[i]['name'].toLowerCase() + count.toString();

             //Loop through however many of the previous entires had the same name
             //if none match current key break the loop
             for(let j = 1; j <= count; j++){
               previousKey = nameObjectArray[i-j]['key']


               uniqueKeyFound = true;
               
               if(currentKey === previousKey){
                 uniqueKeyFound = false
               }
             }

             //Increase count incase next entry has the same name
             count++;
           }
           nameObj['key'] = currentKey;
           nameObj['value'] = scots[i]['name'] + " : " + scots[i]['occupation'];
           nameObjectArray.push(nameObj)
         }

        //assign previous key for next entry comparison
        previousKey = scots[i]['name'].toLowerCase();

      }
      this.setState({nameObjects: nameObjectArray})

    })
  }



  componentDidMount(){
    const request = new Request();

    request.get('/api/occupations')
    .then(data => this.setState({occupations: data}));

    this.populateSearchBox();

  }

  render(){

    return(

      <Fragment>
      <ReactSearchBox
        placeholder="Placeholder"
        value=""
        data={this.state.nameObjects}
        callback={record => console.log(record)}
      />

      <OccupationList
      occupations={this.state.occupations}
      scots={this.state.scots}
      handleSelectOccupation={this.handleSelectOccupation}
      handleGenderFilter={this.handleGenderFilter}
      selectedGender= {this.state.selectedGender} />
      </Fragment>

    )
  }


}

  // <MapContainer scots={this.state.scots}/>

export default ScotContainer;
