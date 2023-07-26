import React, { useEffect, useState } from 'react'
import { TextField, Typography, Paper, styled, Box, Button } from '@mui/material'
import { MuiChipsInput } from 'mui-chips-input'
import FileBase from 'react-file-base64'
import '../../App.css'
import { updatePostAPI } from '../../redux/actions/post'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const Container = styled(Paper)({
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    margin: '40px auto auto auto',
    padding: 20,

});

const UpdatePost = () => {
    const [tags, setTags] = useState([])
    const [post, setPost] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const data = useSelector((state) => state.posts?.posts?.find((msg) => msg._id === id));

    useEffect(() => {
        if(data.title || data.message) {
            setPost({...post, title: data.title, message: data.message});
        }
        // eslint-disable-next-line
    }, []);
    
    const handleTagsChange = (tag) => {
        setTags(tag);
        setPost({ ...post, tags: tag });
    }

    const updatePost = () => {
        dispatch(updatePostAPI(post, id));
        navigate('/posts');
    }

    return (
        <Container>
            <Typography variant='h5' style={{ fontFamily: 'cursive', fontWeight: 600, textAlign: 'center' }}>Update your memory</Typography>
            <TextField
                placeholder='Enter title'
                variant='outlined'
                name='title'
                label='Title'
                style={{ marginTop: 20 }}
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
            <TextField
                multiline
                name='message'
                id="outlined-multiline-static"
                label="message"
                rows={5}
                placeholder='Type your message here...'
                style={{ marginTop: 20 }}
                value={post.message}
                onChange={(e) => setPost({ ...post, message: e.target.value })}
            />
            <MuiChipsInput value={tags} placeholder='Enter tags and Press enter' onChange={handleTagsChange} style={{ marginTop: 20 }} label='Enter tags' />
            <Box className="input-file" style={{ marginTop: 20 }}>
                <FileBase type='file' multiple={false} onDone={({ base64 }) => setPost({ ...post, selectedFile: base64 })} style={{}} />
            </Box>
            <Button onClick={() => updatePost()} variant='contained' style={{ margin: '20px auto', width: 200, padding: 5, fontSize: 18, fontWeight: 600, fontFamily: 'revert', }}>Update</Button>
        </Container>
    )
}

export default UpdatePost
