import React from 'react'

const Content = ({objContent}) => {
let [dataComment, iconWeather, temp, degree, tempMin, tempMax, bgMain, windSpeed, clouds, humidity, pressure] = objContent;
    return (
        <div className='card-content row'>
            <div className='card-description col-md-12'>
                <h4>{`"${dataComment}"`}</h4>
            </div>
            <div className='card-content-img col-md-5'>
                <img src={iconWeather} />
                <h1>{temp} {degree}</h1>
                <h6><small>Min {tempMin}{degree}</small> - <small>Max {tempMax}{degree}</small></h6>
            </div>
            <div className='card-content-data col-md-7'>
                <div className='card-content-data-bg'>
                   
                </div>

                <ul className='list-data'>
                    <ol>
                        <h4>
                            <i className="bi bi-wind"></i>
                            <span>Wind speed</span>
                            <strong> {windSpeed} m/s</strong>
                        </h4>
                    </ol>
                    <ol>
                        <h4>
                            <i className="bi bi-clouds-fill"></i>
                            <span>Clouds</span>
                            <strong>{clouds}%</strong>
                        </h4>
                    </ol>
                    <ol>
                        <h4>
                            <i className="bi bi-droplet-half"></i>
                            <span>Humidity</span>
                            <strong>{humidity}%</strong>
                        </h4>
                    </ol>
                    <ol>
                        <h4>
                            <i className="bi bi-thermometer-half"></i>
                            <span>Pressure</span>
                            <strong>{pressure}hPa</strong>
                        </h4>
                    </ol>
                </ul>

            </div>
        </div>
    )
}

export default Content