import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { locationService } from './services/LocationService';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import localStorageService from './services/LocalStorageService';
import { LOCATION_STORAGE_KEY, LocationData, defaultLocation, FETCH_INTERVAL } from './global';
import { v4 as uuidv4 } from 'uuid';
import LocationCard from './components/LocationCard/LocationCard';
import useAlert from './hooks/useAlert';
import useInterval from './hooks/useInterval';
import { weatherService } from './services/WeatherService';
import WeatherForm from './features/WeatherForm';

function App() {
  const storedLocations: LocationData[] =
    localStorageService.getItem(LOCATION_STORAGE_KEY);
  const [listOfLocations, setListOfLocations] = useState<LocationData[]>(
    storedLocations || []
  );
  const { alert, handleOpen } = useAlert();
  useInterval({
    callback: async () => {
      await fetchWeatherData();
    },
    delay: FETCH_INTERVAL
  });


  const onUpdate = (newLocation: LocationData) => {
    const updatedLocations = listOfLocations.filter(
      (location) =>
        !(location.lat === newLocation.lat && location.lon === newLocation.lon)
    );
    const newLocationWithId = { ...newLocation, id: uuidv4() };
    updatedLocations.push(newLocationWithId);
    setListOfLocations(updatedLocations);
  };

  const onGetWeatherData = async (locationData: LocationData) => {
    try {
      return await weatherService.getWeather(
        locationData?.lat,
        locationData?.lon
      );
    } catch (err) {
      throw err;
    }
  };

  const onGetLocation = async (place: string) => {
    try {
      const locationData: LocationData =
        await locationService.getLocationData(place);
      console.log('location data', locationData);
      const weather = await onGetWeatherData(locationData);
      const locationWithWeatherData = { ...locationData, weatherData: weather };
      onUpdate(locationWithWeatherData);
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    const setDefault = async () => {
      try {
        const defaultWeatherData = await onGetWeatherData(defaultLocation);
        const defaultWithWeatherData = {
          ...defaultLocation,
          weatherData: defaultWeatherData,
        };
        onUpdate(defaultWithWeatherData);
      } catch (err) {
        handleOpen((err as any)?.message || 'Error fetching default location');
      }
    };

    if (storedLocations.length === 0) {
      setDefault();
    }

  }, []);

  const fetchWeatherData =  useCallback(async () => {
    try {
      const updatedLocations = await Promise.all(
        listOfLocations.map(async (location) => {
          const weatherData = await onGetWeatherData(location);
          return { ...location, weatherData };
        })
      );
        setListOfLocations(updatedLocations);
    } catch (err){
      handleOpen((err as any)?.message || 'Error fetching weather data');
    }
  },[listOfLocations])

  useEffect(() => {
    localStorageService.setItem(LOCATION_STORAGE_KEY, listOfLocations);
  }, [listOfLocations]);

  return (
    <div className="App">
      <WeatherForm onGetLocation={onGetLocation} handleOpen={handleOpen} />
      {alert}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {listOfLocations.length > 0 &&
            listOfLocations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
              />
            ))}
        </Grid>
      </Box>
    </div>
  );
}

export default App;
