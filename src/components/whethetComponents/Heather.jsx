import React from 'react'

const Heather = ({cityName, cityCode}) => {
  return (
    <div className='card-heather'>
    <h3 className='brand-app'> Weather App BJMM</h3>
    <h4><strong>{cityName}, {cityCode}</strong></h4>
</div>
  )
}

export default Heather