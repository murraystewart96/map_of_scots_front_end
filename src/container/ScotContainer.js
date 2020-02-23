
import React, {Component, Fragment} from 'react';
import Request from '../helpers/request';
import OccupationList from '../component/OccupationList'
import MapContainer from  './MapContainer'


class ScotContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      occupations: [],
      selectedOccupation: "",
      scots: []
    }

    this.handleSelectOccupation = this.handleSelectOccupation.bind(this);
  }


  handleSelectOccupation(occupation){
    this.setState({selectedOccupation: occupation});
    const request = new Request();

    request.get('/api/scots/' + occupation)
    .then(data => this.setState({scots: data}))
  }


  componentDidMount(){
    const request = new Request();

    request.get('/api/occupations')
    .then(data => this.setState({occupations: data}));
  }

  render(){
    return(
      <Fragment>
      <MapContainer scots={this.state.scots}/>
      <OccupationList occupations={this.state.occupations} handleSelectOccupation={this.handleSelectOccupation} />
      </Fragment>
    )
  }


}

export default ScotContainer;
