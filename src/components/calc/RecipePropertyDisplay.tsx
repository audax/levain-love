import * as React from 'react';
import { RecipeProperties } from '../../data/recipe';
import { Paper, Stack, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';

interface RecipePropertiesDisplayProps {
  properties: RecipeProperties
}
export default function RecipePropertiesDisplay(props: RecipePropertiesDisplayProps) {
  const { properties } = props
  return (
    <TableContainer >
    <TableBody>
      <TableRow>
        <TableCell>Hydration</TableCell>
        <TableCell>{properties.hydration}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Total weight</TableCell>
        <TableCell>{properties.weight}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Flour weight</TableCell>
        <TableCell>{properties.flourWeight}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Fluid weight</TableCell>
        <TableCell>{properties.fluidWeight}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Salt weight</TableCell>
        <TableCell>{properties.saltWeight}</TableCell>
      </TableRow>
    </TableBody>
    </TableContainer>
  );
}