import React from 'react';

interface ISearch {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  location: string | number;
}

const Search = ({ onChange, location }: ISearch) => {
  return (
    <input
      autoFocus
      required
      type="text"
      onChange={onChange}
      value={location}
    />
  );
};

export default Search;
