import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
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
export default function AddModals({ rows, setRows, status, setStatus }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const newData = {
            _id: 'loading...',
            ...data,
        };
        setRows([newData, ...rows]);

        axios
            .post(`http://localhost:9000/api/add-billing`, data)
            .then((res) => {
                console.log(res);
                if (res.data.insertedId) {
                    reset();
                    handleClose();
                    setStatus(!status);
                }
            });
    };

    return (
        <div>
            <Button variant='contained' onClick={handleOpen}>
                Add New Bill
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style} className='containerForm'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <input
                                    placeholder='Enter your Full Name'
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
                </Box>
            </Modal>
        </div>
    );
}
