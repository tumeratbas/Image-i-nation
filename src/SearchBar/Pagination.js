import React from 'react';
import { Pagination as MuiPagination, Stack } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Stack spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', mt: 2 }}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color='standard'
        size="large"
        sx={{
          width: 1,
          margin: 'auto',
          display: 'flex',
          backgroundColor: 'transparent',
          borderRadius: '10px',
        }}
      />
    </Stack>
  );
};

export default Pagination;
