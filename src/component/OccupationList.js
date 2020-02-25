import React, {Fragment} from 'react'
import ReactSearchBox from 'react-search-box'

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

  const handleDOASubmit = (event) => {
    const selectedDOA = event.target.value;
    props.handleDOAFilter(selectedDOA)
  }


  const occupations = props.occupations.map((occupation, index) => {
    return <li key={index} value={index} onClick={handleClick}>{occupation+"s"}</li>
  })

console.log(props.selectedGender);
  return(
    <div className="occupations-container">
      <h1>Great Scots!</h1>
      <div className="search">
      <ReactSearchBox
        placeholder="Input search text"
        value=""
        data={props.nameObjects}
        callback={record => console.log(record)}
      />
      </div>
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
          id="all-gender"
          name="gender"
          value="all-gender"
          checked={props.selectedGender === 'all-gender'}
          onChange={handleGenderSubmit}
          />
          <label for="all-gender">All</label>
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
        <div className="DOA-filter">
          <form>
          <input
          type="radio"
          id="all-DOA"
          name="DOA"
          value="all-DOA"
          checked={props.selectedDOA === 'all-DOA'}
          onChange={handleDOASubmit}
          />
          <label for="all-DOA">All</label>
            <input
            type="radio"
            id="dead"
            name="DOA"
            value="dead"
            checked={props.selectedDOA === 'dead'}
            onChange={handleDOASubmit}
            />
            <label for="dead">Dead</label>
            <input
            type="radio"
            id="alive"
            name="DOA"
            value="alive"
            checked={props.selectedDOA === 'alive'}
            onChange={handleDOASubmit} />
            <label for="alive">Alive</label>
          </form>
        </div>
      </div>
    </div>

  )

}

export default OccupationList;
