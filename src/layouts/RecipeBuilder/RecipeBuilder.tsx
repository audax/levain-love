'use server'
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '@/components/CopyRight/Copyright';
import Link from 'next/link';
import CalcWrapper from "@/components/calc/CalcWrapper";
import {Recipe} from "@/data/recipe";

export default async function RecipeBuilder({ recipe }: { recipe: Recipe }) {
    // noinspection HtmlUnknownTarget
    return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Breader than most!
        </Typography>
        <CalcWrapper recipe={recipe} />
        <Link href="/about">Go to the about page</Link>
        <Copyright />
      </Box>
    </Container>
  );
}
