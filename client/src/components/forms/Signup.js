import { Box, Button, TextField, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { userSignupAPI } from '../../redux/actions/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'

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
    name: "",
    email: "",
    password: ""
}

const Signup = () => {

    const [signup, setSignup] = useState(defaultUser);
    const [error, setError] = useState("");
    const notify = () => toast.success("user created successfully!", { autoClose: 3000 });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setError("");
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const isValidEmail = (email) => {
        // Regular expression pattern for email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    const signupUser = () => {
        if (signup.name === "" || signup.email === "" || signup.password === "") {
            setError("Kindly fill all the required fields (*)");
            return;
        }
        if(!isValidEmail(signup.email)) {
            setError("invalid email! kindly enter correct email address");
            return;
        }

        dispatch(userSignupAPI(signup));

        notify();
        setTimeout(() => {
            navigate('/user/login');
        }, 3000)
    }

    return (
        <Container>
            <Typography variant='h5'>Sign Up</Typography>
            <TextField label="name *" variant="outlined" onChange={(e) => handleChange(e)} name='name' />
            <TextField label="email *" variant="outlined" onChange={(e) => handleChange(e)} name='email' />
            <TextField label="password *" variant="outlined" type='password' onChange={(e) => handleChange(e)} name='password' />
            {error && <Error>{error}</Error>}
            <Button variant='contained' onClick={() => signupUser()}>Sign Up</Button>
            <BottomText>Already have an account! <Link to={'/user/login'}>Login</Link></BottomText>
            <ToastContainer />
        </Container>
    )
}

export default Signup
