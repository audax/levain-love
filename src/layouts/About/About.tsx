'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Copyright from '@/components/CopyRight/Copyright';

export default function About() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Find out more about this project on <a href="https://github.com/audax/levain-love" target="_blank" >Github</a>
        </Typography>
        <Link href="/">Go to the main page</Link>
        <Copyright />
      </Box>
    </Container>
  );
}
