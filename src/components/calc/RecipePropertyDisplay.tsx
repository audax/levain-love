import * as React from "react";
import { RecipeProperties } from "../../data/recipe";
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

interface RecipePropertiesDisplayProps {
  properties: RecipeProperties;
}
export default function RecipePropertiesDisplay(props: RecipePropertiesDisplayProps) {
  const { properties } = props;
  return (
    <TableContainer>
      <Table aria-label="recipe properties table">
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
      </Table>
    </TableContainer>
  );
}
