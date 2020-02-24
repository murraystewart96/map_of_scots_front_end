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
    return <li key={index} value={index} onClick={handleClick}>{occupation}</li>
  })


  return(

    <div className="occupations-list">

      {occupations}

    </div>

  )

}

export default OccupationList;
