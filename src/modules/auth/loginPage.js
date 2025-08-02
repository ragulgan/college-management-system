import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Grid, Typography, Paper, FormControl, FormHelperText, InputAdornment, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '../../featureSlice/auth/authSlice';
import { useSnackbar } from '../../components/common/snackbar';
import { regexPattern } from '../../utils/regex';
import { errorMessage } from '../../utils/regex';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginPage = () => {
    const [hide, setHide] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const result = await dispatch(login(data));
        if (login.fulfilled.match(result)) {
            // enqueueSnackbar(result?.payload?.message, "success");
            navigate('/dashboard');
        } else {
            enqueueSnackbar(result?.payload?.message, "error");
        }
    };

    const passwordShown = () => {
        setHide((prev) => !prev);
    }
    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', px: 2 }}
        >
            <Grid item xs={12} sm={8} md={4}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
                            Login
                        </Typography>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <TextField
                                label="Email"
                                fullWidth
                                margin="normal"
                                error={!!errors.email}
                                {...register('email', {
                                    required: errorMessage.Email_Required,
                                    pattern: {
                                        value: regexPattern.email,
                                        message: errorMessage.Invalid_Email,
                                    },
                                })}
                            />
                            <FormHelperText sx={{ minHeight: '20px', color: 'error.main' }}>
                                {errors.email?.message}
                            </FormHelperText>
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <TextField
                                label="Password"
                                type={hide ? "password": "text"}
                                fullWidth
                                margin="normal"
                                error={!!errors.password}
                                {...register('password', {
                                    required: errorMessage.Password_Required,
                                    pattern: {
                                        value: regexPattern.password,
                                        message: errorMessage.Password_Criteria,
                                    },
                                })}
                                slotProps={{
                                    input: {
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <IconButton onClick={passwordShown} edge="end">
                                            {hide ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                        </InputAdornment>
                                      ),
                                    },
                                  }}
                            />
                            <FormHelperText sx={{ minHeight: '20px', color: 'error.main' }}>
                                {errors.password?.message}
                            </FormHelperText>
                        </FormControl>
                        <Box textAlign="center">
                            <Button type="submit" variant="contained" sx={{ mt: 2, mx: "auto", display: "block", width: 200 }}>
                                Login
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default LoginPage;