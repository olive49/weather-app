import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './App.css';
import useAlert from './hooks/useAlert';
import { LocationData } from './models';
import useInterval from './hooks/useInterval';
import WeatherForm from './features/WeatherForm';
import { weatherService } from './services/WeatherService';
import { locationService } from './services/LocationService';
import localStorageService from './services/LocalStorageService';
import LocationCard from './components/LocationCard/LocationCard';
import {
  LOCATION_STORAGE_KEY,
  defaultLocation,
  FETCH_INTERVAL,
} from './global';

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
    delay: FETCH_INTERVAL,
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
      const weather = await onGetWeatherData(locationData);
      const locationWithWeatherData = { ...locationData, weatherData: weather };
      onUpdate(locationWithWeatherData);
    } catch (err) {
      throw err;
    }
  };

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

  const fetchWeatherData = useCallback(async () => {
    try {
      const updatedLocations = await Promise.all(
        listOfLocations.map(async (location) => {
          const weatherData = await onGetWeatherData(location);
          return { ...location, weatherData };
        })
      );
      setListOfLocations(updatedLocations);
    } catch (err) {
      handleOpen((err as any)?.message || 'Error fetching weather data');
    }
  }, [listOfLocations]);

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
              <LocationCard key={location.id} location={location} />
            ))}
        </Grid>
      </Box>
    </div>
  );
}

export default App;
