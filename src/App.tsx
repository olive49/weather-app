import React, { useState, useEffect } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Button from './components/Button/Button';
import { locationService } from './services/LocationService';
import { weatherService } from './services/WeatherService';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CardBase from './components/Card/Card';
import localStorageService from './services/LocalStorageService';
import { LOCATION_STORAGE_KEY } from './global';
import { v4 as uuidv4 } from 'uuid';

interface LocationData {
  lat: number;
  lon: number;
  id?: string;
}

function App() {
  const defaultLocation: LocationData[] = [
    { lat: 32.07, lon: 34.76, id: uuidv4() },
  ];
  const [location, setLocation] = useState<string>('');
  const storedLocations: LocationData[] =
    localStorageService.getItem(LOCATION_STORAGE_KEY);
  const [listOfLocations, setListOfLocations] = useState<LocationData[]>(
    storedLocations || defaultLocation
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const onUpdate = (newLocation: LocationData) => {
    const updatedLocations = listOfLocations.filter(
      (location) =>
        !(location.lat === newLocation.lat && location.lon === newLocation.lon)
    );
    const newLocationWithId = { ...newLocation, id: uuidv4() };
    console.log('new location with id', newLocationWithId);
    updatedLocations.push(newLocationWithId);
    setListOfLocations(updatedLocations);
    localStorageService.setItem(LOCATION_STORAGE_KEY, updatedLocations);
    console.log(updatedLocations);
  };

  const onGetWeatherData = async (locationData: LocationData) => {
    return await weatherService.getWeather(
      locationData?.lat,
      locationData?.lon
    );
  };

  const onGetLocation = async (place: string) => {
    const locationData: LocationData =
      await locationService.getLocationData(place);
    console.log('location data', locationData);
    onUpdate(locationData);
    const weather = await onGetWeatherData(locationData);
    console.log('weather', weather);
  };

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('on search', location);
    try {
      onGetLocation(location);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // localStorageService.clear();
    // const locations = localStorageService.getItem(LOCATION_STORAGE_KEY);
    // if (locations) {
    //   setListOfLocations(locations);
    // } else {
    //   onGetLocation('New York'); // default location
    // }
    console.log('in the use effect', storedLocations);
    if (!storedLocations) {
      localStorageService.setItem(LOCATION_STORAGE_KEY, defaultLocation);
    }
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const updatedLocations = await Promise.all(
        listOfLocations.map(async (location) => {
          const weatherData = await onGetWeatherData(location);
          return { ...location, weatherData };
        })
      );

      setListOfLocations(updatedLocations);
      localStorageService.setItem(LOCATION_STORAGE_KEY, updatedLocations);
    };

    // Fetch weather data immediately after component mounts
    fetchWeatherData();

    // Then fetch every 5 minutes
    const intervalId = setInterval(fetchWeatherData, 5 * 60 * 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [listOfLocations, onGetWeatherData]);

  return (
    <div className="App">
      <form onSubmit={onSearch}>
        <Search onChange={onChange} location={location} />
        <Button btnText="Search" />
      </form>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CardBase />
          </Grid>
          <Grid item xs={4}>
            <CardBase />
          </Grid>
          <Grid item xs={4}>
            <CardBase />
          </Grid>
          <Grid item xs={4}>
            <CardBase />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
