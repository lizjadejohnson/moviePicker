import React from 'react'

const NoResult = () => {
  return (
    <div className='noResult'>
      Sorry, that is not a valid keyword. Try entering another term.
      <br />
      <br />
      💡 Tip: Keywords typically aren't plural (e.g. if you typed "animals" try "animal" instead).
    </div>
  )
}

export default NoResult
