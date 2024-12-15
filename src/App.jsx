import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";

const App = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState({})
  const [inputData, setInputData] = useState('')
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (!inputData) {
      setInputData('Tbilisi')
    }

    const handler = setTimeout(() => {
      axios
        .get(`https://api.weatherapi.com/v1/current.json?key=1b40634a79db4734baf203617210410&q=${inputData}`)
        .then((response) => {
          setCurrentWeatherData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 300);

    return () => clearTimeout(handler);
  }, [inputData]);

  const inputChangeHandler = (event) => {
    setInputData(event.target.value)
    setShowError(false);
  }

  return (
    <>
      <p>Enter city name: </p>
      <input placeholder="City" value={inputData} onChange={inputChangeHandler} type="text"/>
      <p>{showError ? 'No matching location found.\n' : null}</p>
      {(currentWeatherData && currentWeatherData.current) ?
        <>
          <h1>{currentWeatherData.location.name}</h1>
          <h1>{currentWeatherData.current.temp_c} °C</h1>
          <b>Feels like: {currentWeatherData.current.feelslike_c}</b>
          <figure style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <b>{currentWeatherData.current.condition.text}</b>
            <img src={currentWeatherData.current.condition.icon} alt="weather-icon"/>
          </figure>
          <p>Last Updated: {currentWeatherData.current.last_updated}</p>
          <p>Location: {`${currentWeatherData.location.country}, ${currentWeatherData.location.name}`}</p>
        </> : !showError ? <p>Loading...</p> : null}
    </>
  )
};

export default App
