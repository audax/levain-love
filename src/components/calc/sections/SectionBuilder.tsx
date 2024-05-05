import * as React from "react";
import { SectionBuilderProps } from "./types";
import { useSectionBuilderVm } from "./vm";
import IngredientRow from "./IngredientRow";
import SectionHeader from "./SectionHeader";
import {Button, ButtonGroup, Card, Paper, Table, TableBody, TableContainer} from "@mui/material";
import { IngredientType } from "@/data/recipe";

export default function SectionBuilder(props: Readonly<SectionBuilderProps>) {
  const vm = useSectionBuilderVm(props);

  const ingredientRows = vm.section.ingredients.map((ingredient) => {
    return (
      <IngredientRow
        key={ingredient.key}
        initialEditMode={false}
        ingredient={ingredient}
        onChange={vm.updateIngredient}
        onDelete={() => vm.removeIngredient(ingredient)}
        onScale={vm.scaleByFactor}
      />
    );
  });

  return (
    <Card>
      <SectionHeader section={vm.section} remove={vm.remove} initialEditMode={false}
                     onUpdate={vm.updateHeader}/>
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
