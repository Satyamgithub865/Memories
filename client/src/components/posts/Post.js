import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Box, styled } from '@mui/material';
import { red } from '@mui/material/colors';
import { FavoriteBorder, Favorite, MoreVert, Delete } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePostAPI, likePostAPI } from '../../redux/actions/post';
import jwt_decode from 'jwt-decode'
import { messageEllipsis, titleEllipsis } from '../../utils/commonUtils';


const Tags = styled(Typography)({
    color: '#0a66c2',
    fontFamily: 'revert',
    marginTop: 0,
    wordWrap: 'break-word'
})


const Post = ({ post }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tokenId, setTokenId] = useState(null);
    const [exp, setExp] = useState();
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const { id, exp } = jwt_decode(token);

            setExp(exp);
            setTokenId(id);
            setToggle(post?.likes?.includes(id));
            console.log(post?.likes?.includes(id))
        }
    }, [])

    const deletePost = (id) => {
        if (exp * 1000 < new Date().getTime()) {
            navigate('/user/login')
            return;
        }
        dispatch(deletePostAPI(id));
    }

    const likePost = (id) => {
        if (exp * 1000 < new Date().getTime()) {
            navigate('/user/login')
            return;
        }
        dispatch(likePostAPI(id));

        setToggle(prevState => !prevState);
    }

    return (
        <Card style={{ height: 420 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {post?.author?.charAt(0).toUpperCase()}
                    </Avatar>
                }
                action={tokenId === post.creator ? (
                    <Link to={`/posts/update-post/${post._id}`}>
                        <IconButton aria-label="settings">
                            <MoreVert />
                        </IconButton>
                    </Link>
                ) : ''}
                title={titleEllipsis(post.title)}
                subheader={new Date(post.createdAt).toDateString()}
            />
            <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
                    component="img"
                    height="194"
                    style={{ objectFit: 'cover' }}
                    image={post.selectedFile}
                    alt="post-image"
                />
                <CardContent style={{ padding: '8px 12px', height: 90 }}>
                    <Tags>
                        {post?.tags && post?.tags?.slice(0, 3).map((tag) => (`#${tag}\u00A0\u00A0`))}
                    </Tags>
                    <Typography>
                        {messageEllipsis(post.message)}
                    </Typography>
                </CardContent>
            </Link>
            <CardActions >
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton aria-label="Favorite" disabled={tokenId ? false : true} onClick={() => likePost(post?._id)}>
                            {
                                toggle ? <Favorite /> :
                                    <FavoriteBorder />
                            }
                        </IconButton>
                        <Typography>{post?.likes?.length}</Typography>
                    </Box>
                    {tokenId && tokenId === post?.creator && <Delete onClick={() => deletePost(post?._id)} style={{ cursor: 'pointer', color: 'red' }} />}
                </Box>
            </CardActions>
        </Card>
    );
}

export default Post