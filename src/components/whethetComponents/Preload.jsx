import React from 'react'

const Preload = ({preloadValue}) => {
  return (
    <div className={`card-prealoader ${preloadValue}`}>
    <span className="spinner-grow text-primary" role="status" aria-hidden="false"></span>
</div>
  )
}

export default Preload