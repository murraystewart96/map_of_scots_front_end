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

  const handleSelectScot = (scot) => {
    props.handleSelectScot(scot.id)
  }

  const handleGenderSubmit = (event) => {
    const selectedGender = event.target.value;
    props.handleGenderFilter(selectedGender)
  }

  const handleDOASubmit = (event) => {
    const selectedDOA = event.target.value;
    props.handleDOAFilter(selectedDOA)
  }

  const handleFilter = (event) => {
    props.handleFilter(event.target.value)
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

        onSelect= {handleSelectScot}
      />
      </div>
      <h3>Occupations</h3>
      <div className="occupations-list">
        <ul className ="list">
          {occupations}
        </ul>
      </div>
      <div className="filter-container">
        <h3>Filters</h3>
          <div className="gender-filter">
          <form>

          <label for="all-gender" className="radio">
          <input
          type="radio"
          id="all-gender"
          name="gender"
          value="all-gender"
          className="hidden"
          checked={props.selectedGender === 'all-gender'}
          onChange={handleGenderSubmit}
          />
          <span className="label"></span>All</label>

          <label for="male" className="radio">
            <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            className="hidden"
            checked={props.selectedGender === 'male'}
            onChange={handleGenderSubmit}
            />
            <span className="label"></span>Male</label>

            <label for="female" className="radio">
            <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            className="hidden"
            checked={props.selectedGender === 'female'}
            onChange={handleGenderSubmit} />
            <span className="label"></span>Female</label>
          </form>
          </div>

          <div className="DOA-filter">
          <form>

          <label for="all-DOA" className="radio">
          <input
          type="radio"
          id="all-DOA"
          name="DOA"
          value="all-DOA"
          className="hidden"
          checked={props.selectedDOA === 'all-DOA'}
          onChange={handleDOASubmit}
          />
          <span className="label"></span>All</label>

          <label for="dead" className="radio">
            <input
            type="radio"
            id="dead"
            name="DOA"
            value="dead"
            className="hidden"
            checked={props.selectedDOA === 'dead'}
            onChange={handleDOASubmit}
            />
          <span className="label"></span>Dead</label>

          <label for="alive" className="radio">
            <input
            type="radio"
            id="alive"
            name="DOA"
            value="alive"
            className="hidden"
            checked={props.selectedDOA === 'alive'}
            onChange={handleDOASubmit}
            />
            <span className="label"></span>Alive</label>

          </form>
          </div>
      </div>
    </div>

  )

}

export default OccupationList;
