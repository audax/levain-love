import * as React from "react";
import { Box, Button, Stack, TextField, TextareaAutosize } from "@mui/material";
import Title from "./Title";
import { useCalcVM } from "./vm";
import { CalcProps } from "./types";
import RecipePropertiesDisplay from "./RecipePropertyDisplay";
import SectionBuilder from "./sections/SectionBuilder";

export default function Calc(props: CalcProps) {
  const vm = useCalcVM(props)
  const loadRef = React.useRef<HTMLTextAreaElement>(null)
  const importRef = React.useRef<HTMLTextAreaElement>(null)

  const sections = vm.recipe.sections.map((section) => (
    <SectionBuilder key={section.key} initialSection={section} onChange={(section) => vm.updateSection(section)} />
  ));
  return (
    <Box>
      <Title title={vm.recipe.title} onChange={vm.setTitle} />
      <TextField label="Quantity" type="number" value={vm.recipe.quantity} onChange={(e) => vm.scaleQuantity(Number(e.target.value))} />
      <Stack>{sections}</Stack>
      <Button onClick={vm.addSection}>Add Section</Button>
      <RecipePropertiesDisplay properties={vm.properties} />
      <TextareaAutosize data-testid="export" value={JSON.stringify(vm.recipe, null, 2)} /> 
      <TextareaAutosize data-testid="load" ref={loadRef} />
      <Button onClick={() => loadRef.current && vm.loadRecipe(loadRef.current.value)}>Load recipe</Button>
      <TextareaAutosize data-testid="import" ref={importRef} />
      <Button onClick={() => importRef.current && vm.importRecipe(importRef.current.value)}>Import recipe</Button>
    </Box>
  );
}
