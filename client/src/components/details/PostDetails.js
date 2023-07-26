import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostsById, fetchPostsBySearch } from '../../redux/actions/post';
import Loader from '../loader/Loader'
import { Box, Paper, Typography, styled } from '@mui/material';
import HorizontalScrollMenu from '../recommendation/HorizontalScrollMenu';
import CommentSection from '../comment/CommentSection';

const Container = styled(Paper)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column-reverse',
    }
}));

const Right = styled(Box)(({ theme }) => ({
    width: '30%',
    padding: 15,
    '& > img': {
        width: '100%',
        height: 350,
        borderRadius: 8,
        boxShadow: '1px 2px 5px'
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        padding: 0
    }
}));

const Left = styled(Box)(({ theme }) => ({
    width: '70%',
    padding: 15,
    [theme.breakpoints.down('md')]: {
        width: '100%',
        padding: 0
    }
}));

const Heading = styled(Typography)({
    fontFamily: 'monospace',
    fontWeight: 600,
    color: 'crimson'
});

const Tags = styled(Typography)({
    wordWrap: 'break-word',
    color: '#0a66c2',
    fontFamily: 'revert',
    marginTop: 5,
});

const PostDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { posts, post, isLoading } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPostsById(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (post) {
            dispatch(fetchPostsBySearch({ search: 'none', tags: post.tags.join(',') }));
        }
    }, [post, dispatch])

    if(!post) {
        return <h3>wait for a while! fetching...</h3>
    }

    const reccomendedPost = posts?.filter(({ _id }) => (_id !== post?._id));

    return (
        isLoading ? <Loader /> :
            <Paper elevation={3} style={{ width: '90%', margin: '30px auto 20px auto', padding: 20 }}>
                <Container elevation={0}>
                    <Left>
                        <Heading variant='h4'>{post.title}</Heading>
                        <Tags>
                            {post?.tags && post?.tags?.map((tag) => (`#${tag}\u00A0\u00A0`))}
                        </Tags>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0px' }}>
                            <Typography style={{ color: 'GrayText' }}>author: {post?.author}</Typography>
                            <Typography style={{ color: 'GrayText' }}>{new Date(post?.createdAt).toDateString()}</Typography>
                        </Box>
                        <Typography>{post?.message}</Typography>
                        <Typography style={{
                            color: 'Highlight', margin: '10px 0px', textShadow: '1px 1px 1px'
                        }}>Liked By: {post?.likes?.length} people</Typography>
                    </Left>
                    <Right>
                        <img src={post?.selectedFile} alt="post_img" />
                    </Right>
                </Container>
                <Paper elevation={0} style={{marginTop: 30}}>
                    <CommentSection post={post} />
                </Paper>
                {reccomendedPost.length > 0 && (
                    <Paper elevation={0} style={{ marginTop: 50 }}>
                        <Typography variant='h6' style={{ marginLeft: 20, fontWeight: 600, color: 'gray' }}>You might also like: </Typography>
                        <HorizontalScrollMenu posts={reccomendedPost} />
                    </Paper>
                )}
            </Paper>

    )
}

export default PostDetails
