import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

let weather = {};

const WetherLayout = ({ urlData }) => {
    const [weatherData, setWeatherData] = useState();

    useEffect(() => {
        if (urlData) {
            axios.get(urlData)
                .then(res => setWeatherData(res.data))
                .catch(error => console.log(error))
        }
    }, [urlData])


    if (weatherData) weather = weatherData;
    return (
        <div className='col-md-12'>
            <h3>Weather App</h3>
            <p>{weather.toString()}</p>
        </div>

    )
}

export default WetherLayout