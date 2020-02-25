
import React, {Component, Fragment} from 'react';
import Request from '../helpers/request';
import OccupationList from '../component/OccupationList'
import MapContainer from  './MapContainer'
import {Marker} from 'google-maps-react';
import ReactSearchBox from 'react-search-box'
import FilterHelper from '../helpers/filterHelper'


class ScotContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      occupations: [],
      selectedOccupation: "",
      scots: [],
      allScotsInOccupation: [],
      nameObjects: [],
      markers: [],
      genderFilter: "all-gender",
      doaFilter: "all-DOA"
    }

    this.handleSelectOccupation = this.handleSelectOccupation.bind(this);
    this.handleGenderFilter = this.handleGenderFilter.bind(this);
    this.handleDOAFilter = this.handleDOAFilter.bind(this);
    this.filter = this.filter.bind(this);

  }


  handleSelectOccupation(occupation){
    this.setState({selectedOccupation: occupation});
    const request = new Request();

    request.get('/api/scots/' + occupation)
    .then((data) => {
      this.setState({scots: data});
      this.setState({allScotsInOccupation: this.state.scots})
    })

  }


  filter(){

    const filterHelper = new FilterHelper();

    let filteredScots = this.state.allScotsInOccupation;

    if(this.state.genderFilter !== "all-gender"){
      filteredScots = filterHelper.filterByGender(this.state.genderFilter, filteredScots);
    }

    if(this.state.doaFilter !== "all-DOA"){
      filteredScots = filterHelper.filterByDOA(this.state.doaFilter, filteredScots);
    }

    this.setState({scots: filteredScots});
  }


  handleGenderFilter(filter){
    this.setState({genderFilter: filter}, this.filter)
  }

  handleDOAFilter(filter){
    this.setState({doaFilter: filter}, this.filter)
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

      <MapContainer scots={this.state.scots}/>


      <OccupationList
      occupations={this.state.occupations}
      scots={this.state.scots}
      handleSelectOccupation={this.handleSelectOccupation}
      handleGenderFilter={this.handleGenderFilter}
      handleDOAFilter={this.handleDOAFilter}
      selectedGender= {this.state.genderFilter}
      selectedDOA={this.state.doaFilter}
       />
      </Fragment>

    )
  }


}

  //<MapContainer scots={this.state.scots}/>

export default ScotContainer;
