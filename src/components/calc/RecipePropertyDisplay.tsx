import * as React from 'react';
import { RecipeProperties } from '../../data/recipe';
import { Box, Stack, TextField } from '@mui/material';

interface RecipePropertiesDisplayProps {
  properties: RecipeProperties
}
export default function RecipePropertiesDisplay(props: RecipePropertiesDisplayProps) {
  const { properties } = props
  return (
    <Stack component="form"
      noValidate
      autoComplete="off"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
    >
      <TextField value={properties.hydration} label="Hydration" />
      <TextField value={properties.weight} label="Weight" />
      <TextField value={properties.flourWeight} label="Flour weight" /> 
      <TextField value={properties.fluidWeight} label="Fluid weight" /> 
      <TextField value={properties.saltWeight} label="Salt weight" />
    </Stack>
  );
}