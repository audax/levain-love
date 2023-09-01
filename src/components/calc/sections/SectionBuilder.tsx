import * as React from "react";
import { SectionBuilderProps } from "./types";
import { useSectionBuilderVm } from "./vm";
import IngredientRow from "./IngredientRow";
import {Button, ButtonGroup, Card, Chip, Paper, Table, TableBody, TableContainer} from "@mui/material";
import { IngredientType } from "@/data/recipe";

export default function SectionBuilder(props: SectionBuilderProps) {
  const vm = useSectionBuilderVm(props);

  const ingredientRows = vm.section.ingredients.map((ingredient) => {
    return (
      <IngredientRow
        key={ingredient.key}
        initialEditMode={false}
        ingredient={ingredient}
        onChange={vm.updateIngredient}
        onDelete={() => vm.removeIngredient(ingredient)}
      />
    );
  });

  return (
    <Card>
      <h2>{vm.section.name} <Chip label={vm.section.type} /> </h2>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableBody>
            {...ingredientRows}
          </TableBody>
        </Table>
      </TableContainer>
      <ButtonGroup variant="outlined">
        <Button size="small" onClick={() => vm.addIngredient(IngredientType.flour)}>flour</Button>
        <Button size="small" onClick={() => vm.addIngredient(IngredientType.fluid)}>fluid</Button>
        <Button size="small" onClick={() => vm.addIngredient(IngredientType.salt)}>salt</Button>
        <Button size="small" onClick={() => vm.addIngredient(IngredientType.yeast)}>yeast</Button>
        <Button size="small" onClick={() => vm.addIngredient(IngredientType.starter)}>starter</Button>
        <Button size="small" onClick={() => vm.addIngredient(IngredientType.other)}>other</Button>
      </ButtonGroup>
    </Card>
  );
}
