import { useState } from "react";
import { Recipe, Section, SectionType } from "@/data/recipe";
import { CalcProps, CalcVM } from "./types";
import { calculateRecipeProperties, scaleRecipe } from "@/data/calculate";
import { v4 as uuidv4 } from 'uuid';
import { importRecipe } from "@/data/import";

function buildSection(): Section {
  return {
    name: 'New Section',
    key: uuidv4(),
    type: SectionType.dough,
    ingredients: []
  }
}

export function useCalcVM(props: CalcProps): CalcVM {
  const { initialRecipe, onChange } = props;
  const [recipe, setRecipe] = useState(initialRecipe);
  const update = (changed: Recipe) => {
    onChange(changed);
    setRecipe(changed);
  }
  const scaleQuantity = (quantity: number) => {
    update(scaleRecipe(recipe, quantity))
  }
  const setQuantity = (quantity: number) => {
    update({
      ...recipe,
      quantity
    })
  }
  return {
    recipe,
    setQuantity,
    scaleQuantity,
    properties: calculateRecipeProperties(recipe),
    setTitle: (title: string) => update({ ...recipe, title }),
    loadRecipe: (recipe: string) => {update(JSON.parse(recipe))},
    importRecipe: (recipe: string) => {update(importRecipe(JSON.parse(recipe)))},
    addSection: () =>
      update({
        ...recipe,
        sections: [...recipe.sections, buildSection()]
      }),
    removeSection: (section: Section) =>
      update({
        ...recipe,
        sections: [...recipe.sections.filter(s => s.key !== section.key)  ]
      }),
    updateSection: (section: Section) =>
      update({
        ...recipe,
        sections: [...recipe.sections.map(s => s.key === section.key ? section : s)]
      })
  };
}
