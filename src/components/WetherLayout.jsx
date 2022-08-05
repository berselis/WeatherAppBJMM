import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import cloudlogo from '../assets/cloud.png';

let weather = {
    cityName: '-',
    cityCode: '-',
    iconWeather: cloudlogo,
    temperature: '--',
    dataComment: '-',
    windSpeed: 0,
    clouds: 0,
    pressure: 0,
    preload: ''
};

// F   ℉;
// C   °C

let degree = '°C';

const getWeatherData = (data) => {
    console.log(data);
    weather.cityName = data.name;
    weather.cityCode = data.sys.country;
    weather.iconWeather = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weather.temperature = data.main.temp;
    weather.dataComment = data.weather[0].description;
    weather.windSpeed = data.wind.speed;
    weather.clouds = data.clouds.all;
    weather.pressure = data.main.pressure;

    weather.preload = 'hide-preload';


    return weather;
}

const WetherLayout = ({ urlData }) => {
    const [weatherData, setWeatherData] = useState();

    useEffect(() => {
        if (urlData) {
            axios.get(urlData)
                .then(res => setWeatherData(res.data))
                .catch(error => console.log(error))
        }
    }, [urlData])


    if (weatherData) weather = getWeatherData(weatherData);

    return (
        <div className='col-md-12'>
            <div className='card-body'>
                <div className={`card-prealoader ${weather.preload}`}>
                    <span className="spinner-grow text-primary" role="status" aria-hidden="false"></span>
                </div>
                <div className='card-heather'>
                    <h3 className='brand-app'> Weather App BJMM</h3>
                    <h4><strong>{weather.cityName}, {weather.cityCode}</strong></h4>

                </div>
                <hr className="border border-primary border-2 opacity-50"></hr>
                <div className='card-content row'>
                    <div className='card-content-img col-md-5'>
                        <img src={weather.iconWeather} />
                        <h1>{weather.temperature} {degree}</h1>
                    </div>
                    <div className='card-content-data col-md-7'>
                        <h4>{`"${weather.dataComment}"`}</h4>
                        <ul className='list-data'>
                            <ol>
                                <h4>
                                    <i className="bi bi-wind"></i>
                                    <span>Wind speed</span>
                                    <strong> {weather.windSpeed} m/s</strong>
                                </h4>
                            </ol>
                            <ol>
                                <h4>
                                    <i className="bi bi-clouds-fill"></i>
                                    <span>Clouds</span>
                                    <strong>{weather.clouds}%</strong>
                                </h4>
                            </ol>
                            <ol>
                                <h4>
                                    <i className="bi bi-thermometer-half"></i>
                                    <span>Pressure</span>
                                    <strong>{weather.pressure} mb</strong>
                                </h4>

                            </ol>
                            <ol>-</ol>
                        </ul>

                    </div>
                </div>
                <div className='card-footer-weather'>
                    <button className="btn btn-primary" type="button">Change to ℉</button>
                </div>
            </div>
        </div>

    )
}

export default WetherLayout