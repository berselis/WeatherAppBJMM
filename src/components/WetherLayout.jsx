import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import cloudlogo from '../assets/cloud.png';

let weather = {
    cityName: '-',
    cityCode: '-',
    iconWeather: cloudlogo,
    dataComment: '-',
    windSpeed: 0,
    clouds: 0,
    humidity: 0,
    pressure: 0,
    preload: ''
};


let msjBtnDegree = 'Change to ℉';

const getWeatherData = (data) => {
    weather.cityName = data.name;
    weather.cityCode = data.sys.country;
    weather.iconWeather = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weather.dataComment = data.weather[0].description;
    weather.windSpeed = data.wind.speed;
    weather.clouds = data.clouds.all;
    weather.humidity = data.main.humidity;
    weather.pressure = data.main.pressure;

    weather.preload = 'hide-preload';


    return weather;
}


const WetherLayout = ({ urlData }) => {
    let [weatherData, setWeatherData] = useState();
    let [degree, setDegree] = useState('°C');
    let [temp, setTemp] = useState();
    let [tempMin, setTempMin] = useState();
    let [tempMax, setTempMax] = useState();

    const setCeltoFah = () => {
        //(0°C × 9/5) + 32 = 32°F
        setTemp((temp * 9 / 5) + 32);
        setTempMin((tempMin * 9 / 5) + 32);
        setTempMax((tempMax * 9 / 5) + 32);

    }

    const setFahtoCel = () => {
        //(0°F − 32) × 5/9 = -17.78°C
        setTemp((temp - 32) * 5 / 9);
        setTempMin((tempMin - 32) * 5 / 9);
        setTempMax((tempMax - 32) * 5 / 9);

    }

    const changeMeasure = () => {
        if (degree === '°C') {
            setDegree('℉');
            msjBtnDegree = 'Change to °C';
            setCeltoFah();
        } else {
            setDegree('°C');
            msjBtnDegree = 'Change to ℉';
            setFahtoCel();
        }
    }

    useEffect(() => {
        if (urlData) {
            axios.get(urlData)
                .then(res => {
                    setWeatherData(res.data);
                    setTemp(res.data.main.temp);
                    setTempMin(res.data.main.temp_min);
                    setTempMax(res.data.main.temp_max);

                })
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
                    <div className='card-description col-md-12'>
                        <h4>{`"${weather.dataComment}"`}</h4>
                    </div>
                    <div className='card-content-img col-md-5'>
                        <img src={weather.iconWeather} />
                        <h1>{temp} {degree}</h1>
                        <h4><small>Min {tempMin}{degree}</small> - <small>Max {tempMax}{degree}</small></h4>
                    </div>
                    <div className='card-content-data col-md-7'>

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
                                    <i className="bi bi-droplet-half"></i>
                                    <span>Humidity</span>
                                    <strong>{weather.humidity}%</strong>
                                </h4>
                            </ol>
                            <ol>
                                <h4>
                                    <i className="bi bi-thermometer-half"></i>
                                    <span>Pressure</span>
                                    <strong>{weather.pressure}hPa</strong>
                                </h4>
                            </ol>
                            <ol>-</ol>
                        </ul>

                    </div>
                </div>
                <div className='card-footer-weather'>
                    <button onClick={changeMeasure} className="btn btn-primary" type="button">{msjBtnDegree}</button>
                </div>
            </div>
        </div>

    )
}

export default WetherLayout