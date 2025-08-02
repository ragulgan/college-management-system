import React, { useState, useEffect } from 'react'
import { Box, IconButton, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import { useNavigate, useLocation } from 'react-router';
import { Menu as MenuIcon, Dashboard, People, CastForEducation } from '@mui/icons-material';

const Sidebar = () => {
    const isSmallScreen = useMediaQuery('(max-width: 768px)');
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { label: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
        { label: 'Users', path: '/users', icon: <People /> },
        { label: 'College', path: '/colleges', icon: <CastForEducation /> },

        // { label: 'useRef', path: '/useRef', icon: <CastForEducation /> },
        // { label: 'useContext', path: '/useContext', icon: <CastForEducation /> },
        // { label: 'useMemo', path: '/useMemo', icon: <CastForEducation /> },
        // { label : 'useCallback', path: '/useCallback', icon: <CastForEducation />}
    ];

    useEffect(() => {
        setCollapsed(isSmallScreen);
    }, [isSmallScreen]);

    return (
        <Box
            width={collapsed ? 70 : 240}
            bgcolor="#1976d2"
            color="white"
            minHeight="100vh"
            p={1}
            sx={{
                transition: 'width 0.3s ease-in-out',
                position: isSmallScreen ? 'fixed' : 'relative',
                zIndex: 1200,
            }}
        >
            <IconButton
                onClick={() => setCollapsed(!collapsed)}
                sx={{ color: 'white', mb: 2 }}
            >
                <MenuIcon />
            </IconButton>

            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.label}
                        onClick={() => navigate(item.path)}
                        sx={{
                            bgcolor: location.pathname === item.path ? '#1565c0' : 'transparent',
                            borderRadius: 1,
                            mb: 1,
                            pl: collapsed ? 1 : 2,
                            justifyContent: collapsed ? 'center' : 'flex-start',
                        }}
                    >
                        {item.icon}
                        {!collapsed && <ListItemText sx={{ ml: 2 }} primary={item.label} />}
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default Sidebar;
