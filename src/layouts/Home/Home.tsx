'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '@/components/CopyRight/Copyright';
import Link from 'next/link';
import Calc from '@/components/calc/Calc';
import { emptyRecipe } from '@/data/recipe';

export default function Home() {
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
          Breader than most!
        </Typography>
        <Calc initialRecipe={emptyRecipe} onChange={() => {}} /> 
        <Link href="/about">Go to the about page</Link>
        <Copyright />
      </Box>
    </Container>
  );
}
