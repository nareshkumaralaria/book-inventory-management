import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Divider, Typography } from '@mui/material';

const Header = () => {
    return (
        <>
            <Container maxWidth="xl">
                <Box sx={{ bgcolor: '#fff', height: '64px', display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                    <Typography variant="h6" gutterBottom sx={{ mb: '0', cursor: "pointer" }}>
                        Solar Ladder
                    </Typography>
                    <Button variant="outlined">Logout</Button>
                </Box>
                <Divider />
                <Box sx={{ bgcolor: '#fff', width: "fit-content", height: '48px', display: 'flex', alignItems: 'center', justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.12)" }}>
                    <Typography variant="h6" gutterBottom sx={{ mb: '0', cursor: "pointer" }}>
                        Books List
                    </Typography>
                </Box>
            </Container>
        </>
    )
}

export default Header