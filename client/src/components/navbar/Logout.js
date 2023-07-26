import { Button, Avatar, Box, Typography, styled } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Container = styled(Box)({
    display: 'flex',
    marginLeft: 'auto',
    alignItems: 'center'
});

const Text = styled(Typography)(({theme}) => ({
    color: '#000',
    margin: '0px 20px 0px 20px',
    background: '#ffb3d1',
    padding: '6px 20px',
    fontSize: 22,
    borderRadius: 8,
    fontFamily: 'cursive',
    [theme.breakpoints.down('md')]: {
        fontSize: 14,
        padding: '6px 12px'
    }
}));

const LogoutBtn = styled(Button)({
    backgroundColor: '#e6005c'
})

const Logout = ({ setUser, user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notify = () => toast.success("Logout successful!", { autoClose: 2000 });

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        notify();
        setTimeout(() => {
            setUser(null);
            navigate('/posts');
            window.location.reload();
        }, 2000);
    }

    return (
        <Container>
            <Avatar
                sx={{ bgcolor: '#ff3385', fontSize: 22 }}
            >
                {user.charAt(0).toUpperCase()}
            </Avatar>
            <Text>hello {user.split(" ")[0]}</Text>
            <LogoutBtn variant='contained' onClick={handleLogout}>Logout</LogoutBtn>
            <ToastContainer />
        </Container>
    )
}

export default Logout
