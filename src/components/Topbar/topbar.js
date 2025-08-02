import React, {useState} from 'react'
import { Box, Typography, Button, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { useNavigate } from 'react-router';

const Topbar = () => {
    const [logoutMenu, setLogoutMenu] = useState(null);
    const user = JSON.parse(localStorage.getItem('adminInfo'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminInfo');
        navigate('/login');
    };

    const handleCurrentMenuClick = (e) =>{
        setLogoutMenu(e.currentTarget);
    }

    const handleClose = () =>{
        setLogoutMenu(null);
    }

    const handleChangePassword = () => {
        handleClose();
        // Navigate or open modal to change password
    };

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            bgcolor="white"
            boxShadow={1}
        >
            <Typography variant="h6" className='app-bar'>College Admin Panel</Typography>

            <Box display="flex" alignItems="center" gap={2}>
                <IconButton onClick={handleCurrentMenuClick}>
                <Avatar alt={user?.firstName} src={user?.profileImage} />
                </IconButton>
                <Typography variant="body1">{user?.firstName} {user?.lastName}</Typography>
                <Menu
                    anchorEl={logoutMenu}
                    open={Boolean(logoutMenu)}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Box>
        </Box>
    )
}

export default Topbar