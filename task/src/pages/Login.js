import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { Box, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';
const inputStyle = {
    border: '2px solid #000',
    borderRadius: '5px',
    padding: '10px 3px',
    width: '100%',
};
const Login = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { user, setUser } = useAuth();

    const saveUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
    };
    const onSubmit = (data) => {
        console.log(data);
        axios
            .post(`http://localhost:9000/api/add-billing`, data)
            .then((res) => {
                console.log(res);
                if (res.data.insertedId) {
                    saveUser(data);
                    setUser(data);
                    reset();
                }
            });
    };
    return (
        <Box
            sx={{
                width: '350px',
                margin: 'auto',
                marginTop: '150px',
            }}>
            <Typography variant='h5'>Login form</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3} sx={{ mt: 3 }}>
                    <Grid item xs={12}>
                        <input
                            placeholder='Enter your Email'
                            {...register('Email', {
                                required: true,
                                pattern:
                                    /^[a-z0-9._%=-]+@+[a-z0-9.-]+\.[a-z]+$/i,
                            })}
                            style={inputStyle}
                        />
                        {errors?.Email && (
                            <p
                                style={{
                                    color: 'red',
                                    margin: '0px',
                                }}>
                                Enter a valied email id
                            </p>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            placeholder='Enter your Password'
                            type='password'
                            {...register('Password', {
                                required: true,
                                minLength: 4,
                            })}
                            style={inputStyle}
                        />
                        {errors?.Phone && (
                            <p
                                style={{
                                    color: 'red',
                                    margin: '0px',
                                }}>
                                Phone number must be 11 digit
                            </p>
                        )}
                    </Grid>
                    <Grid item xs={12} sx={{ m: 0, p: 0 }}>
                        <p>
                            New user ?
                            <Link
                                to='/registration'
                                style={{
                                    color: 'blue',
                                    margin: '0px',
                                    textDecoration: 'none',
                                }}>
                                <span>Please Signup..</span>
                            </Link>
                        </p>
                    </Grid>
                    <Grid item xs={12}>
                        <input type='submit' value='login' />
                    </Grid>
                </Grid>
            </form>

            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3} sx={{ mt: 4 }}>
                    <Grid item xs={12}>
                        <input
                            placeholder='Enter your Email'
                            {...register('Email', {
                                required: true,
                                pattern:
                                    /^[a-z0-9._%=-]+@+[a-z0-9.-]+\.[a-z]+$/i,
                            })}
                            style={inputStyle}
                        />
                        {errors?.Email && (
                            <p
                                style={{
                                    color: 'red',
                                    margin: '0px',
                                }}>
                                Enter a valied email id
                            </p>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            type='password'
                            placeholder='Enter your Password'
                            {...register('Password', {
                                required: true,
                                maxLength: 5,
                                minLength: 12,
                            })}
                            style={inputStyle}
                        />
                        {errors?.Phone && (
                            <p
                                style={{
                                    color: 'red',
                                    margin: '0px',
                                }}>
                                Phone number must be 11 digit
                            </p>
                        )}
                    </Grid>
                  

                    <Grid item xs={12}>
                        <input type='submit' value='Login' />
                    </Grid>
                </Grid>
            </form> */}
        </Box>
    );
};

export default Login;
