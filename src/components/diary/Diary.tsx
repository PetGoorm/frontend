import api from "lib/api";
import { Container, Typography, Grid, TextField, Box, Link, Button, Card } from '@mui/material';


export const Diary = () => {
    

    return (
        <>
            <Container component="main" maxWidth="sm" sx={{ padding: 3 }}>
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '1px solid #DCDCDC', borderRadius: 5,
                        padding: 4, backgroundColor: 'white'
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        펫 다이어리
                    </Typography>
                </Card>
            </Container>
        </>
    )
};
