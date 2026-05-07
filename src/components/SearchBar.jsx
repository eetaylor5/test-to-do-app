import React from 'react';
import { TextField, Box } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Search Your Todo Lists"
        variant="outlined"
        fullWidth
        onChange={handleChange}
        placeholder="Search by title, description, or tags"
      />
    </Box>
  );
};

export default SearchBar;