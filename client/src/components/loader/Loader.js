import { Box, styled } from '@mui/material'
import React from 'react'
import { CircularProgress } from '@mui/material'

const Container = styled(Box)({
    textAlign: 'center',
    marginTop: 20
})

const Loader = () => {
    return (
        <Container>
            <CircularProgress />
        </Container>
    )
}

export default Loader
