import React from 'react'

const Button = ({shuffleMovies, buttonName}) => {
  return (
    <div>
      <button onClick={shuffleMovies}>{buttonName}</button>
    </div>
  )
}

export default Button
