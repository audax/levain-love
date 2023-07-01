import * as React from "react";
import { SectionBuilderProps } from "./types";
import { useSectionBuilderVm } from "./vm";
import IngredientRow from "./IngredientRow";
import { Button, Stack } from "@mui/material";
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
    <div>
      <h2>{vm.section.name}</h2>
      <Button onClick={() => vm.addIngredient(IngredientType.flour)}>flour</Button>
      <Button onClick={() => vm.addIngredient(IngredientType.fluid)}>fluid</Button>
      <Button onClick={() => vm.addIngredient(IngredientType.salt)}>salt</Button>
      <Button onClick={() => vm.addIngredient(IngredientType.yeast)}>yeast</Button>
      <Button onClick={() => vm.addIngredient(IngredientType.starter)}>starter</Button>
      <Button onClick={() => vm.addIngredient(IngredientType.other)}>other</Button>
      <Stack>{...ingredientRows}</Stack>
    </div>
  );
}
