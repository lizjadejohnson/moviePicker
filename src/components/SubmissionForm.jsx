import React from 'react'

//We receive as props the handleSearch function and inputRef 
//We set the inputRef to what we type in our form input field.
//handleSearch sets the search term to whatever inputRef is.

const SubmissionForm = ({handleSearch, inputRef}) => {
  return (
    <div className='submissionForm'>
        {/* Sets our input as the inputRef */}
      <input type="text" ref={inputRef} placeholder="Enter a movie keyword" />
        {/* Runs handleSearch function on submit button: */}
      <button className="searchBtn" onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SubmissionForm
