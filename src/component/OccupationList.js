import React, {Fragment} from 'react'

const OccupationList = (props) => {

  if(!props.occupations){
    return "Loading...";
  }


  const handleClick = (event) => {
    const occupation = props.occupations[event.target.value];
    props.handleSelectOccupation(occupation)
	}

  const handleGenderSubmit = (event) => {
    const selectedGender = event.target.value;
    props.handleGenderFilter(selectedGender)
  }


  const occupations = props.occupations.map((occupation, index) => {
    return <li key={index} value={index} onClick={handleClick}>{occupation+"s"}</li>
  })

console.log(props.selectedGender);
  return(
    <div className="occupations-container">
      <h1>Great Scots!</h1>
      <div className="occupations-list">
        <ul className ="list">
          {occupations}
        </ul>
      </div>
      <div className="filter-container">
        <h2>Filters</h2>
        <div className="gender-filter">
          <form>
            <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={props.selectedGender === 'male'}
            onChange={handleGenderSubmit}
            />
            <label for="male">Male</label>
            <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={props.selectedGender === 'female'}
            onChange={handleGenderSubmit} />
            <label for="female">Female</label>
          </form>
        </div>
      </div>
    </div>

  )

}

export default OccupationList;
