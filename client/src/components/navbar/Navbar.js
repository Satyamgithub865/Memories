import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Box, Toolbar, styled } from '@mui/material'
import { mem_logo, camera_logo } from '../../utils/commonUtils'
import Logout from './Logout'
import { useLocation } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';

const Header = styled(AppBar)({
    background: '#fff',
    padding: 5
})

const Container = styled(Box)`
    & > a {
        color: #00cc00;
        text-decoration: none;
        font-size: 25px;
        margin-right: 30px;
        font-family: roboto;
        font-weight: 600;
        cursor: pointer;
        &:hover {
            color: #000;
        }
    }
    display: flex;
    margin-left: auto;
    padding: 10px;
`

const Navbar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            const { name, exp } = jwt_decode(accessToken);
            if (exp * 1000 < new Date().getTime()) {
                setUser(null);
                dispatch({ type: 'LOGOUT' })
            }
            else setUser(name);
        }

    }, [location, dispatch])


    return (
        <Header position="static">
            <Toolbar>
                <Link to='/'><img src={mem_logo} alt="ai_logo" style={{ width: 120, padding: 10 }} /></Link>
                <Link to='/'><img className='heading' src={camera_logo} alt="camera-logo" style={{ width: 40, padding: 10 }} /></Link>
                {
                    user ? <Logout setUser={setUser} user={user} /> : (
                        <Container>
                            <Link to={'/user/signup'}>Sign Up</Link>
                            <Link to={'/user/login'}>Login</Link>
                        </Container>
                    )
                }
            </Toolbar>
        </Header>
    )
}

export default Navbar
