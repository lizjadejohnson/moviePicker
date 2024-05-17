import React from 'react'

const SubmissionForm = ({handleSearch, inputRef, handleInputChange}) => {
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
