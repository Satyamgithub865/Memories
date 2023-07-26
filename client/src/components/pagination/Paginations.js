import React, { useEffect } from 'react'
import { Box, Pagination, PaginationItem, styled } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../../redux/actions/post'

const Container = styled(Box)({
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30
})

const Paginations = ({ page }) => {
    const dispatch = useDispatch();

    const { numberOfPages } = useSelector((state) => state.posts);

    useEffect(() => {
        if (page) dispatch(getAllPosts(page));
    }, [page, dispatch])

    return (
        <Container>
            <Pagination
                count={numberOfPages}
                page={Number(page) || 1}
                color="secondary"
                renderItem={(item) => (
                    <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
                )}
            />
        </Container>
    )
}

export default Paginations
