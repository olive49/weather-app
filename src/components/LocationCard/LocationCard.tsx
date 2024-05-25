import React, { memo } from 'react';

import Grid from '@mui/material/Grid';
import CardBase from '../CardBase/CardBase';
import { LocationWeatherData } from '../../models';

interface IProps {
  location: LocationWeatherData;
}

const LocationCard = ({ location }: IProps) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={2}>
      <CardBase
        title={location?.weatherData?.name || ''}
        subtitle={location?.weatherData?.weather[0]?.description || ''}
        description={
          `temp: ${location?.weatherData?.main?.temp}\u00B0C feels like: ${location?.weatherData?.main?.feels_like}\u00B0C` ||
          ''
        }
      />
    </Grid>
  );
};

export default memo(LocationCard);
