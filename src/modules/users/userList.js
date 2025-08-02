import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserList } from '../../featureSlice/user/userListSlice';
import { listFormat } from '../../utils/timeformat'
import { getStatusColor, statusOptions } from '../../utils/regex';
import { Table, Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, IconButton, Button, MenuItem, Box, InputAdornment } from '@mui/material'
import { Edit, Visibility, Delete, Add, Search } from '@mui/icons-material';
import UserAddEditDrawer from './userAddEdit';
import { userAddMethod } from '../../featureSlice/user/userAddSlice';
import { userUpdateMethod } from '../../featureSlice/user/userUpdateSlice'
import { useSnackbar } from '../../components/common/snackbar';

const UserList = () => {
    const dispatch = useDispatch()
    const { users, count, loading, error } = useSelector((state) => state.user);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerData, setDrawerData] = useState(null);
    const debounceRef = useRef(null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        const params = {
            page: page + 1,
            limit: rowsPerPage,
            userMobile: search?.trim() || undefined,
            userName: search?.trim() || undefined,
            status: status || undefined
        }
        debounceRef.current = setTimeout(() => {
            dispatch(fetchUserList(params));
        }, 1000);
        return () => clearTimeout(debounceRef.current);
    }, [dispatch, page, rowsPerPage, search, status]);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(0);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        setPage(0);
    };

    const openDrawer = (data = null) => {
        setDrawerData(data);
        setDrawerOpen(true);
    };
    const openDrawerEdit = (data) => {
        setDrawerData(data);
        setDrawerOpen(true);
    };
    const closeDrawer = () => {
        setDrawerOpen(false);
        setDrawerData(null);
    };

    const onSubmit = async (id, data) => {
        let result;
        if (id) {
            result = await dispatch(userUpdateMethod({ id, data }));
        } else {
            result = await dispatch(userAddMethod(data));
        }
        if ((id && userUpdateMethod.fulfilled.match(result)) || (!id && userAddMethod.fulfilled.match(result))) {
            enqueueSnackbar(result?.payload?.message, "success");
        } else {
            enqueueSnackbar(result?.payload?.message, "error");
        }
    };

    const fetchData = () => {
        const params = {
            page: page + 1,
            limit: rowsPerPage
        }
        dispatch(fetchUserList(params));
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        size="small"
                        placeholder="Search by name or mobile"
                        value={search}
                        onChange={handleSearchChange}
                        component={Paper}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end">
                                            <Search />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <TextField
                        select
                        size="small"
                        label="Select Status"
                        value={status}
                        onChange={handleStatusChange}
                        sx={{ minWidth: 150 }}
                        component={Paper}
                    >
                        <MenuItem value="">All Status</MenuItem>
                        {statusOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Button variant="contained" startIcon={<Add />} onClick={() => openDrawer(null)}>
                    Add User
                </Button>
            </Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>User Name</TableCell>
                                <TableCell>Mobile</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow><TableCell colSpan={5}>Loading...</TableCell></TableRow>
                            ) : users?.length ? (
                                users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.userName}</TableCell>
                                        <TableCell>{user.userMobile}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <span style={getStatusColor(user.status)}>
                                                {user.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>{listFormat(user.createdAt)}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => openDrawerEdit(user)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton><Visibility /></IconButton>
                                            <IconButton><Delete /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow><TableCell colSpan={5}>No records found</TableCell></TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={count || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <UserAddEditDrawer
                    open={drawerOpen}
                    onClose={closeDrawer}
                    data={drawerData}
                    onSave={async (id, formData) => {
                        await onSubmit(id, formData);
                        closeDrawer();
                        fetchData();
                    }}
                />
            </Paper>
        </>
    )
}

export default UserList