// src/components/common/SnackbarProvider.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SnackbarContext = createContext();
export const useSnackbar = () => useContext(SnackbarContext);

const SnackbarProvider = ({ children }) => {
  const [snack, setSnack] = useState({
    open: false,
    message: '',
    type: 'info',
  });

  const enqueueSnackbar = useCallback((message, type = 'info') => {
    setSnack({ open: true, message, type });
  }, []);

  const handleClose = () => {
    setSnack((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ enqueueSnackbar }}>
      {children}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={snack.type}
          variant="filled"
          action={
            <IconButton size="small" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          sx={{
            width: '100%',
            bgcolor: {
              success: '#4caf50',
              error: '#f44336',
              warning: '#ff9800',
              info: '#2196f3',
            }[snack.type],
          }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
