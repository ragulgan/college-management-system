import React from 'react'
import { Outlet } from 'react-router'
import { Box } from '@mui/material'
import Topbar from '../components/Topbar/topbar'
import Sidebar from '../components/sidebar/sidebar'

const DashboardLayout = () => {
    return (
        <Box display="flex" height="100vh">
            <Sidebar />
            <Box flex={1} display="flex" flexDirection="column">
                <Topbar />
                <Box flex={1} p={2} bgcolor="#f4f6f8">
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}

export default DashboardLayout