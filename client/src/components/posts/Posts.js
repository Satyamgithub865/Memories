import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'
import Loader from '../loader/Loader';
import { Grid } from '@mui/material';

const Posts = () => {

    const {posts, isLoading} = useSelector((state) => state.posts);

    if(!posts && !posts.length && !isLoading) {
        return <h1>No Post to show</h1>
    }

    return (
        !isLoading ? (
            <Grid container spacing={2}>
                {posts?.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <Post post={post} />
                    </Grid>
                ))}
            </Grid>
        ) :  <Loader />
    )
}

export default Posts
