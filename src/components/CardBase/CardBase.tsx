import React from 'react';
import { CardContent, Typography, Card } from '@mui/material';

interface IProps {
  title: string;
  subtitle: string;
  description: string;
}

const CardBase = ({ title, subtitle, description }: IProps) => {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title || ''}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {subtitle || ''}
        </Typography>
        <Typography variant="body2">{description || ''}</Typography>
      </CardContent>
    </Card>
  );
};

export default CardBase;
