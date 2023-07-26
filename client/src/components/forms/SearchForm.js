import React, { useState } from 'react'
import { Button, Paper, TextField, styled } from '@mui/material'
import { MuiChipsInput } from 'mui-chips-input'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchPostsBySearch } from '../../redux/actions/post'

const Container = styled(Paper)({
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    marginTop: 30,
    '& > button': {
        marginTop: 20,
        background: '#ff0066',
        fontSize: 18,
        fontWeight: 600,
    },
});

const SearchForm = () => {
    const [tags, setTags] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchPost = () => {
        if(search==='' && !tags?.length) {
            navigate('/');
            return;
        }
        if (search.trim() || tags) {
            dispatch(fetchPostsBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?title=${search || 'none'}&tags=${tags.join(',')}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    const handleTagsChange = (tag) => {
        setTags(tag);
    };

    return (
        <Container elevation={6}>
            <TextField variant='outlined' label='Title' placeholder='Enter title you want search for' onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => handleKeyPress(e)} />
            <MuiChipsInput value={tags} placeholder='Enter tags and Press enter' onChange={handleTagsChange} style={{ marginTop: 20 }} label='Enter tags' />
            <Button variant='contained' onClick={() => searchPost()}>Search</Button>
        </Container>
    )
}

export default SearchForm
