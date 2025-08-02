import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';

const PageNotFound = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    const handleGoHome = () => {
        navigate('/dashboard');
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            textAlign="center"
            px={2}
            bgcolor={theme.palette.background.default}
        >
            <Typography variant="h2" fontWeight="bold" color="primary">
                404
            </Typography>

            <Typography variant="h6" mt={1} color="text.primary">
                Oops! Page not found
            </Typography>

            <Typography variant="body1" mt={1} mb={3} color="text.secondary">
                The page you're looking for doesn't exist or has been moved.
            </Typography>

            <Button variant="contained" color="primary" onClick={handleGoHome}>
                Go to Home
            </Button>
        </Box>
    );
};

export default PageNotFound;
