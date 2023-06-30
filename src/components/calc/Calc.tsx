import * as React from "react";
import { Box, Button, Stack } from "@mui/material";
import Title from "./Title";
import { useCalcVM } from "./vm";
import { CalcProps } from "./types";
import RecipePropertiesDisplay from "./RecipePropertyDisplay";
import SectionBuilder from "./sections/SectionBuilder";

export default function Calc(props: CalcProps) {
  const vm = useCalcVM(props);

  const sections = vm.recipe.sections.map((section) => (
    <SectionBuilder key={section.key} initialSection={section} onChange={(section) => vm.updateSection(section)} />
  ));
  return (
    <Box>
      <Title title={vm.recipe.title} onChange={vm.setTitle} />
      <Stack>{sections}</Stack>
      <Button onClick={vm.addSection}>Add Section</Button>
      <RecipePropertiesDisplay properties={vm.properties} />
    </Box>
  );
}
