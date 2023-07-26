import React from 'react'
import { Button, Grid, styled, Box, Paper } from '@mui/material'
import Posts from '../posts/Posts'
import { useNavigate, useLocation } from 'react-router-dom'
import { camera } from '../../utils/commonUtils'
import '../../App.css'
import SearchForm from '../forms/SearchForm'
import Paginations from '../pagination/Paginations'

const CreateBtn = styled(Button)({
    background: '#99003d',
    boxShadow: 'none',
    fontSize: 15,
    fontWeight: 600,
    textTransform: 'capitalize',
    fontFamily: 'monospace',
    height: '60px',
});

const CreateContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    background: '#ff1a75',
    width: '80%',
    margin: 'auto',
    borderRadius: '20px 0px 0px 20px',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60px',
    marginTop: '20px',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
        width: '280px',
    }
}));

const GridContainer = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexDirection: 'column-reverse',
        padding: 20,
    }
}));

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const navigate = useNavigate();

    const query = useQuery();
    const page = query.get('page') || 1;

    const getToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/posts/create-post')
        } else {
            navigate('/user/login')
        }
    }

    return (
        <GridContainer container >
            <Grid item xs={12} sm={12} md={9} lg={9} xl={9} style={{ padding: 30 }}>
                <Posts />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} style={{ padding: 30 }}>
                <CreateContainer className='zoomButton' onClick={() => getToken()}>
                    <img src={camera} style={{ width: 100 }} alt="camera" />
                    <CreateBtn variant='contained'>Create your memory</CreateBtn>
                </CreateContainer>
                <SearchForm />
                <Paper elevation={6}>
                    <Paginations page={page} />
                </Paper>
            </Grid>
        </GridContainer>
    )
}

export default Home
