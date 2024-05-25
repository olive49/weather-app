import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  LOCATION_STORAGE_KEY,
  FETCH_INTERVAL,
  defaultLocation,
} from '../../global';
import useAlert from '../../hooks/useAlert';
import useInterval from '../../hooks/useInterval';
import { LocationData } from '../../models';
import localStorageService from '../../services/LocalStorageService';
import { WeatherErrors } from './error';
import { onGetWeatherData, onGetLocationData } from './helpers';
import WeatherForm from './WeatherForm';
import WeatherList from './WeatherList';

const Weather = () => {
  const storedLocations: LocationData[] =
    localStorageService.getItem(LOCATION_STORAGE_KEY);
  const [listOfLocations, setListOfLocations] = useState<LocationData[]>(
    storedLocations || []
  );
  const { alert, handleOpen } = useAlert();
  useInterval({
    callback: async (): Promise<void> => {
      try {
        const updatedLocations = await onGetWeatherData(listOfLocations);
        if (updatedLocations) {
          setListOfLocations(updatedLocations);
        }
      } catch (err) {
        handleError(err, WeatherErrors.WEATHER_ERROR);
      }
    },
    delay: FETCH_INTERVAL,
  });

  const handleError = (err: any, backupMsg: WeatherErrors): void => {
    handleOpen((err as any)?.message || backupMsg);
  };

  const onNewLocation = (newLocation: LocationData): void => {
    const updatedLocations = listOfLocations.filter(
      (location) =>
        !(location.lat === newLocation.lat && location.lon === newLocation.lon)
    );
    const newLocationWithId = { ...newLocation, id: uuidv4() };
    setListOfLocations([...updatedLocations, newLocationWithId]);
  };

  const addLocationWithWeatherData = async (
    location: LocationData
  ): Promise<void> => {
    try {
      const locationWithWeatherData = await onGetWeatherData([location]);
      if (locationWithWeatherData) {
        onNewLocation(locationWithWeatherData[0]);
      }
    } catch (err) {
      throw err;
    }
  };

  const onGetItemWeatherData = async (place: string): Promise<void> => {
    try {
      const locationData: LocationData = await onGetLocationData(place);
      await addLocationWithWeatherData(locationData);
    } catch (err) {
      handleError(err, WeatherErrors.WEATHER_ERROR);
    }
  };

  useEffect(() => {
    const setDefault = async (): Promise<void> => {
      try {
        await addLocationWithWeatherData(defaultLocation);
      } catch (err) {
        handleError(err, WeatherErrors.LOCATION_ERROR);
      }
    };
    if (storedLocations.length === 0) {
      setDefault();
    }
  }, []);

  useEffect(() => {
    localStorageService.setItem(LOCATION_STORAGE_KEY, listOfLocations);
  }, [listOfLocations]);

  return (
    <>
      <WeatherForm
        onGetLocation={onGetItemWeatherData}
        handleOpen={handleOpen}
      />
      {alert}
      <WeatherList listOfLocations={listOfLocations} />
    </>
  );
};

export default Weather;
