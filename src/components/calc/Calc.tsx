'use client'

import * as React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Button, Stack, TextareaAutosize} from "@mui/material";
import RecipeHeader from "./RecipeHeader";
import { useCalcVM } from "./vm";
import { CalcProps } from "./types";
import RecipePropertiesDisplay from "./RecipePropertyDisplay";
import SectionBuilder from "./sections/SectionBuilder";

export default function Calc(props: CalcProps) {
  const vm = useCalcVM(props)
  const loadRef = React.useRef<HTMLTextAreaElement>(null)
  const importRef = React.useRef<HTMLTextAreaElement>(null)

  const sections = vm.recipe.sections.map((section) => (
    <SectionBuilder remove={vm.removeSection} key={section.key} initialSection={section} onChange={vm.updateSection} />
  ));
  return (
    <Stack>
      <RecipeHeader name={vm.recipe.title} initialEditMode={false}
                    quantity={vm.recipe.quantity} onUpdate={({name, quantity}) => {
                        vm.setTitle(name)
                        vm.setQuantity(quantity)
                    }} scaleQuantity={vm.scaleQuantity}/>
      <Button disabled={!vm.modified} onClick={vm.save}>Save recipe</Button>
      <Stack>{sections}</Stack>
      <Button onClick={vm.addSection}>Add Section</Button>
      <RecipePropertiesDisplay properties={vm.properties} />
      <Accordion>
          <AccordionSummary>Export, Import, Loading</AccordionSummary>
          <AccordionDetails>
              <TextareaAutosize data-testid="export" value={JSON.stringify(vm.recipe, null, 2)} />
              <TextareaAutosize data-testid="load" ref={loadRef} />
              <Button onClick={() => loadRef.current && vm.loadRecipe(loadRef.current.value)}>Load recipe</Button>
              <TextareaAutosize data-testid="import" ref={importRef} />
              <Button onClick={() => importRef.current && vm.importRecipe(importRef.current.value)}>Import recipe</Button>
          </AccordionDetails>
      </Accordion>
    </Stack>
  );
}
