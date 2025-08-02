import React, { useState, useEffect } from 'react'
import { Box, Drawer, TextField, MenuItem, Button } from '@mui/material';
import { statusOptions } from '../../utils/regex';

const UserAddEditDrawer = ({ open, onClose, data, onSave }) => {
    const [formData, setFormData] = useState({
        userName: '',
        userMobile: '',
        email: '',
        password: '',
        role: null,
        status: 'ACTIVE',
    });

    useEffect(() => {
        if (data) {
            setFormData({
                userName: data.userName || '',
                userMobile: data.userMobile || '',
                email: data.email || '',
                password: data.password || '',
                role: null,
                status: data.status || 'ACTIVE',
            });
        } else {
            setFormData({
                userName: '',
                userMobile: '',
                email: '',
                password: '',
                role: null,
                status: 'ACTIVE',
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        onSave(data?._id, formData);
    };

    return (
        <>
            <Drawer anchor="right" open={open} onClose={onClose}>
                <Box sx={{ width: 350, p: 3 }}>
                    <h3>{data ? 'Edit User' : 'Add User'}</h3>
                    <TextField
                        fullWidth
                        label="User Name"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Mobile"
                        name="userMobile"
                        value={formData.userMobile}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        select
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        margin="normal"
                    >
                        {statusOptions.map((status) => (
                            <MenuItem key={status} value={status}>{status}</MenuItem>
                        ))}
                    </TextField>

                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleSubmit}>
                            {data ? 'Update' : 'Create'}
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </>
    )
}

export default UserAddEditDrawer