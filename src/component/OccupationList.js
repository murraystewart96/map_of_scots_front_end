import React, {Fragment} from 'react'

const OccupationList = (props) => {

  if(!props.occupations){
    return "Loading...";
  }


  const handleClick = (event) => {
    console.log(event.target.value);
    const occupation = props.occupations[event.target.value];
    props.handleSelectOccupation(occupation)
	}


  const occupations = props.occupations.map((occupation, index) => {
    return <li key={index} value={index} onClick={handleClick}>{occupation+"s"}</li>
  })


  return(
    <div className="occupations-container">
    <h1>Great Scots!</h1>
    <div className="occupations-list">
      <ul className ="list">
      {occupations}
      </ul>
    </div>
    <h2>Filters go here</h2>
    </div>

  )

}

export default OccupationList;
