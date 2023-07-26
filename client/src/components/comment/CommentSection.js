import React, { useEffect, useState, useRef } from 'react';
import { List, ListItem, Paper, TextField, Box, Typography, Button, styled } from '@mui/material';
import { useDispatch } from 'react-redux'
import { addCommentAPI } from '../../redux/actions/post';
import jwt_decode from 'jwt-decode'

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '40%',
    padding: 30,
    flexDirection: 'column',
    '& > p': {
        marginBottom: 5
    },
    '& > button': {
        marginTop: 10
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        padding: 0
    }
}))

const Main = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    }
}));

const Right = styled(Paper)(({ theme }) => ({
    width: '60%',
    border: '3px solid #cc0052',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginTop: 20,
    }
}))

const CommentSection = ({ post }) => {
    const dispatch = useDispatch();
    const listRef = useRef();
    const [comment, setComment] = useState('');
    const [user, setUser] = useState('');
    const [comments, setComments] = useState(post?.comments);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const { name } = jwt_decode(token);
            setUser(name);
        }
    }, [])

    const handleComment = async () => {
        const finalComment = `${user}: ${comment}`;
        const newComments = await dispatch(addCommentAPI(finalComment, post._id));
        setComment('');
        setComments(newComments);

        // Scroll to the bottom of the list after adding a new comment
        listRef.current.scrollTop = Infinity; // Scroll to a large value first
        setTimeout(() => {
            listRef.current.scrollTop = listRef.current.scrollHeight; // Then set to the actual scrollHeight in the next render cycle
        }, 1000);
    }

    return (
        <Main elevation={0}>
            {
                user && (
                    <Container elevation={0}>
                        <Typography>Write a comment</Typography>
                        <TextField
                            multiline
                            variant='outlined'
                            label='comment'
                            placeholder='write your comment here...'
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button variant='contained' onClick={() => handleComment()}>Comment</Button>
                    </Container>
                )
            }
            <Right elevation={0}>
                <Typography variant='h5' style={{ fontFamily: 'cursive', fontWeight: 600, padding: 10, backgroundColor: 'bisque' }}>Comments:</Typography>
                <List ref={listRef} style={{ maxHeight: 200, overflowY: 'auto', padding: 8 }}>
                    {comments?.map((item, index) => (
                        <ListItem key={index} style={{ background: 'pink', padding: 8, marginTop: 5 }}>
                            <Typography><strong>{item?.split(':')[0]}</strong>: {item?.split(':')[1]}</Typography>
                        </ListItem>
                    ))}
                </List>
            </Right>
        </Main>
    );
};

export default CommentSection;
