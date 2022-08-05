import reactLogo from './assets/react.svg';
import bootstrapLogo from './assets/bootstrap-logo-shadow.png';
import bootstrapIcoLogo from './assets/icons-hero.png';
import './App.css';
import WetherLayout from './components/WetherLayout';
import { useState, useEffect } from 'react';


const getUrl = (coords) => {
  const APIkey = 'c09d9ad11329850401ae4541bbfb0abb';
  return `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIkey}&units=metric`;
}


function App() {

  let [coords, setCoords] = useState();
 
  useEffect(() => {

    const success = (res) => {
      const coordsData = {
        lat: res.coords.latitude,
        lon: res.coords.longitude
      }
      setCoords(coordsData);
    }
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  let URL;
  if (coords) URL = getUrl(coords);

  return (
    <div className="app-body">

      <div className='app-inner'>
        <div className='App'>
          <div className='row'>
            <div className='col-md-12'>
              <a href="#">
                <img src="/vite.svg" className="logo" alt="Vite logo" />
              </a>
              <a href="#">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
              <a href="#">
                <img src={bootstrapLogo} className="logo" alt="Bootstrap logo" />
              </a>
              <a href="#">
                <img src={bootstrapIcoLogo} className="logo" alt="Bootstrap-icon logo" />
              </a>
            </div>
            <div className='col-md-12'>
              <div className='content-card row'>

                <WetherLayout urlData={URL} />

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='wave'></div>
      <div className='wave'></div>
      <div className='wave'></div>

    </div>
  )
}

export default App
