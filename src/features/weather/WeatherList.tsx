import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { LocationWeatherData } from '../../models';
import LocationCard from './../../components/LocationCard/LocationCard';

interface IProps {
  listOfLocations: LocationWeatherData[];
}

const WeatherList = ({ listOfLocations }: IProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {listOfLocations.length > 0 &&
          listOfLocations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
      </Grid>
    </Box>
  );
};

export default WeatherList;
