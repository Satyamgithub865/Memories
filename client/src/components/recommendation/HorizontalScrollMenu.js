import React from 'react';
import { Box, Paper, Typography, styled } from '@mui/material';
import { titleEllipsis, messageEllipsis } from '../../utils/commonUtils'
import { Link } from 'react-router-dom';


const Root = styled(Box)({
    display: 'flex',
    overflowX: 'auto',
    padding: 8
});

const Container = styled(Paper)({
    flex: '0 0 auto',
    margin: 10,
    minWidth: 200,
    maxWidth: 300,
    padding: 10,
});

const HorizontalScrollMenu = ({ posts }) => {

    return (
        <Root>
            {posts.map((post) => (
                <Container key={post._id} elevation={3}>
                    <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="h6">{titleEllipsis(post?.title)}</Typography>
                        <Typography variant="body1" style={{ color: 'GrayText' }}>author: {post?.author}</Typography>
                        <Typography variant="body1">{messageEllipsis(post?.message)}</Typography>
                        <Typography variant="body1" style={{
                            color: 'Highlight', margin: '10px 0px', textShadow: '1px 1px 1px'
                        }}>Likes: {post?.likes?.length}</Typography>
                        <img src={post?.selectedFile} alt="post_img" style={{height: 200, width: 300}} />
                    </Link>
                </Container>
            ))}
        </Root>
    )
}

export default HorizontalScrollMenu;
