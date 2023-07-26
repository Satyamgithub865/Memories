import { Box, Button, TextField, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { userLoginAPI } from '../../redux/actions/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    background: '#ffffff',
    margin: '50px auto auto auto',
    boxShadow: '1px 1px 2px 2px rgb(0 0 0/20%)',
    borderRadius: 20,
    padding: 40,
    '& > div': {
        marginTop: 20,
    },
    '& > button': {
        width: '150px',
        margin: '20px auto auto auto',
        textTransform: 'none'
    }
})

const BottomText = styled(Typography)({
    marginTop: 20,
    textAlign: 'center',
    '& > a': {
        color: 'green',
        textTransform: 'none',
        textDecoration: 'none'
    }
});

const Error = styled(Typography)`
    color: red;
    margin: 10px auto;
    font-size: 14px;
`

const defaultUser = {
    email: "",
    password: ""
}

const Login = () => {

    const [login, setLogin] = useState(defaultUser);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notify = () => toast.success("Longin successfull!", { autoClose: 2000 });

    const handleChange = (e) => {
        setErrorMsg('');
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        const error = await dispatch(userLoginAPI(login));
        if (error) {
            setErrorMsg('Invalid credential!');
            return;
        } else {
            setErrorMsg('');
            notify();
            setTimeout(() => {
                navigate('/posts');
            }, 1000)
        }
    }

    return (
        <Container>
            <Typography variant='h5'>Login</Typography>
            <TextField label="email *" variant="outlined" onChange={(e) => handleChange(e)} name='email' />
            <TextField label="password *" variant="outlined" type='password' onChange={(e) => handleChange(e)} name='password' />
            {errorMsg && <Error>{errorMsg}</Error>}
            <Button variant='contained' onClick={() => loginUser()}>Login</Button>
            <BottomText>Don't have an account! <Link to={'/user/signup'}> Please Register</Link></BottomText>
            <ToastContainer />
        </Container>
    )
}

export default Login
