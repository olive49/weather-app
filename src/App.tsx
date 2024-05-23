import React, { useState } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Button from './components/Button/Button';
import apiServiceInstance from './services/ApiService';
import { locationService } from './services/LocationService';
import { weatherService } from './services/WeatherService';

function App() {
  const [location, setLocation] = useState<string | number>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('on search', location);
    try {
      // await apiServiceInstance.getWeather(location);
      const locationData = await locationService.getLocationData(location);
      console.log('location data', locationData);
      const weatherData = await weatherService.getWeather(
        locationData.lat,
        locationData.lon
      );
      console.log('weatherData', weatherData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App" data-testid="app">
      <form onSubmit={onSearch}>
        <Search onChange={onChange} location={location} />
        <Button btnText="Search" />
      </form>
    </div>
  );
}

export default App;
