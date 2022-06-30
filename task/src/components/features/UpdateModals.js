import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};

const inputStyle = {
    border: '2px solid #000',
    borderRadius: '5px',
    padding: '10px 3px',
    width: '100%',
};
export default function UpdateModals({ status, setStatus, id }) {
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = useState(null);
    // console.log(rows);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        axios
            .get(`http://localhost:9000/api/update-billing/${id}`)
            .then((res) => {
                setRows(res.data);
            });
    }, [id]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        axios
            .put(`http://localhost:9000/api/update-billing/${id}`, data)
            .then((res) => {
                if (res.status === 200) {
                    setStatus(!status);
                    handleClose();
                }
            });
    };

    return (
        <div>
            <Button onClick={handleOpen}>Edit</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style} className='containerForm'>
                    {rows !== null && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <input
                                        placeholder='Enter your Full Name'
                                        defaultValue={rows.FullName}
                                        {...register('FullName', {
                                            required: true,
                                            maxLength: 20,
                                        })}
                                        style={inputStyle}
                                    />
                                    {errors?.FullName && (
                                        <p
                                            style={{
                                                color: 'red',
                                                margin: '0px',
                                            }}>
                                            Enter your name
                                        </p>
                                    )}
                                </Grid>

                                <Grid item xs={12}>
                                    <input
                                        placeholder='Enter your Email'
                                        defaultValue={rows.Email}
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
                                        placeholder='Enter your phone number'
                                        defaultValue={rows.Phone}
                                        type='number'
                                        {...register('Phone', {
                                            required: true,
                                            maxLength: 11,
                                            minLength: 11,
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
                                    <input
                                        placeholder='Enter Paid amount'
                                        defaultValue={rows.PaidAmount}
                                        type='number'
                                        {...register('PaidAmount', {
                                            required: true,
                                        })}
                                        style={inputStyle}
                                    />
                                    {errors?.PaidAmount && (
                                        <p
                                            style={{
                                                color: 'red',
                                                margin: '0px',
                                            }}>
                                            Please Enter your paid amount
                                        </p>
                                    )}
                                </Grid>

                                <Grid item xs={12}>
                                    <input type='submit' />
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Box>
            </Modal>
        </div>
    );
}
