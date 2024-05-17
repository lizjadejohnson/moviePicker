import React from 'react'

//onClick, shuffleMovies is called

const Button = ({shuffleMovies, buttonName}) => {
  return (
    <div>
      <button onClick={shuffleMovies}>{buttonName}</button>
    </div>
  )
}

export default Button
