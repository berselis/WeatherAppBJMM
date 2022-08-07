import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MainsBg } from './MainsBgObject';
import Preload from './whethetComponents/Preload';
import Heather from './whethetComponents/Heather';
import Content from './whethetComponents/Content';

let weather = {
    cityName: '-',
    cityCode: '-',
    iconWeather: 'https://bdevelopment.net/resourse/img/weatherbgapp/Clouds.png',
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
    let [bgMain, setbgMain] = useState(weather.iconWeather)

    const setCeltoFah = () => {
        //(0°C × 9/5) + 32 = 32°F
        setTemp(((temp * 9 / 5) + 32).toFixed(2));
        setTempMin(((tempMin * 9 / 5) + 32).toFixed(2));
        setTempMax(((tempMax * 9 / 5) + 32).toFixed(2));

    }

    const setFahtoCel = () => {
        //(0°F − 32) × 5/9 = -17.78°C
        setTemp(((temp - 32) * 5 / 9).toFixed(2));
        setTempMin(((tempMin - 32) * 5 / 9).toFixed(2));
        setTempMax(((tempMax - 32) * 5 / 9).toFixed(2));

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
                    setbgMain(MainsBg[res.data.weather[0].main])

                })
                .catch(error => console.log(error))
        }
    }, [urlData])

    if (weatherData) weather = getWeatherData(weatherData);

    const dataContent = [
        weather.dataComment,
        weather.iconWeather,
        temp,
        degree,
        tempMin,
        tempMax,
        bgMain,
        weather.windSpeed,
        weather.clouds,
        weather.humidity,
        weather.pressure

    ];

    return (
        <div className='col-md-12'>
            <div className='card-body'>
                <Preload preloadValue={weather.preload} />
                <Heather cityName={weather.cityName} cityCode={weather.cityCode} />
                <hr className="border border-primary border-2 opacity-50"></hr>
                <Content objContent={dataContent} />
                <div className='card-footer-weather'>
                    <button onClick={changeMeasure} className="btn btn-primary" type="button">{msjBtnDegree}</button>
                </div>
            </div>
        </div>

    )
}

export default WetherLayout