import { useState } from "react";
import { Recipe, Section, SectionType } from "@/data/recipe";
import { CalcProps, CalcVM } from "./types";
import { calculateRecipeProperties } from "@/data/calculate";
import { v4 as uuidv4 } from 'uuid';

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
  onChange(recipe);
  const update = (changed: Recipe) => {
    setRecipe(changed);
    onChange(changed);
  }
  return {
    recipe,
    properties: calculateRecipeProperties(recipe),
    setTitle: (title: string) => setRecipe({ ...recipe, title }),
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
