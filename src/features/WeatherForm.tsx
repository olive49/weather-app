import React, { useState } from 'react';
import Button from '../components/Button/Button';
import Search from '../components/Search/Search';
import SearchIcon from '@mui/icons-material/Search';
import styles from './WeatherForm.module.css';

interface IProps {
  onGetLocation: (location: string) => void;
  handleOpen: (msg: string) => void;
}

const WeatherForm = ({ onGetLocation, handleOpen }: IProps) => {
  const [location, setLocation] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onGetLocation(location);
    } catch (err) {
      handleOpen((err as any)?.message || 'Unknown error');
    }
  };

  return (
    <form onSubmit={onSearch} className={styles.form}>
      <Search onChange={onChange} location={location} />
      <Button btnText="Search" endIcon={<SearchIcon/>}/>
    </form>
  );
};

export default WeatherForm;
