import * as React from "react";
import { RecipeProperties } from "@/data/recipe";
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

interface RecipePropertiesDisplayProps {
  properties: RecipeProperties;
}
export default function RecipePropertiesDisplay(props: RecipePropertiesDisplayProps) {
  const { properties } = props;
  return (
    <TableContainer data-testid="recipe-properties">
      <Table aria-label="recipe properties table">
        <TableBody>
          <TableRow>
            <TableCell>Hydration</TableCell>
            <TableCell>{properties.hydration.toFixed(0)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total weight</TableCell>
            <TableCell>{properties.weight.toFixed(0)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Flour weight</TableCell>
            <TableCell>{properties.flourWeight.toFixed(0)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fluid weight</TableCell>
            <TableCell>{properties.fluidWeight.toFixed(0)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Salt weight</TableCell>
            <TableCell>{properties.saltWeight.toFixed(0)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
