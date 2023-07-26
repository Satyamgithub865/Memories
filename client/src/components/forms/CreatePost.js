import React, { useState, useEffect } from 'react'
import { TextField, Typography, Paper, styled, Box, Button } from '@mui/material'
import { MuiChipsInput } from 'mui-chips-input'
import FileBase from 'react-file-base64'
import '../../App.css'
import { createPostAPI } from '../../redux/actions/post'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";

const Container = styled(Paper)({
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    margin: '40px auto auto auto',
    padding: 20,

});

const CreatePost = () => {
    const [tags, setTags] = useState([])
    const [post, setPost] = useState({ title: '', message: '', tags: '', selectedFile: '', author: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            const { name } = jwt_decode(accessToken);
            setPost({ ...post, author: name })
        }
        // eslint-disable-next-line
    }, [])

    const handleTagsChange = (tag) => {
        setTags(tag);
        setPost({ ...post, tags: tag });
    }


    const uploadPost = () => {
        dispatch(createPostAPI(post));
        navigate('/posts');
    }

    return (
        <Container>
            <Typography variant='h5' style={{ fontFamily: 'cursive', fontWeight: 600, textAlign: 'center' }}>Create your memory</Typography>
            <TextField
                placeholder='Enter title'
                variant='outlined'
                name='title'
                label='Title'
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                style={{ marginTop: 20 }}
            />
            <TextField
                multiline
                name='message'
                onChange={(e) => setPost({ ...post, message: e.target.value })}
                id="outlined-multiline-static"
                label="message"
                rows={5}
                placeholder='Type your message here...'
                style={{ marginTop: 20 }}
            />
            <MuiChipsInput value={tags} placeholder='Enter tags and Press enter' onChange={handleTagsChange} style={{ marginTop: 20 }} label='Enter tags' />
            <Box className="input-file" style={{ marginTop: 20 }}>
                <FileBase type='file' multiple={false} onDone={({ base64 }) => setPost({ ...post, selectedFile: base64 })} style={{}} />
            </Box>
            <Button onClick={() => uploadPost()} variant='contained' style={{ margin: '20px auto', width: 200, padding: 5, fontSize: 18, fontWeight: 600, fontFamily: 'revert', }}>Create</Button>
        </Container>
    )
}

export default CreatePost
