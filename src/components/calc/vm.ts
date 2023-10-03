import { useState } from "react";
import { Recipe, Section, SectionType } from "@/data/recipe";
import { CalcProps, CalcVM } from "./types";
import { calculateRecipeProperties, scaleRecipe } from "@/data/calculate";
import { v4 as uuidv4 } from 'uuid';
import { importRecipe } from "@/data/import";
import {load} from "@/data/persistence";
import {useRouter} from "next/navigation";
import {saveRecipe} from "@/db/recipeDb";

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
  const router = useRouter()
  const update = (changed: Recipe) => {
    onChange(changed);
    setRecipe(changed);
  }
  const scaleQuantity = (quantity: number) => {
    if (quantity <= 0) { return }
    update(scaleRecipe(recipe, quantity))
  }
  const setQuantity = (quantity: number) => {
    update({
      ...recipe,
      quantity
    })
  }
  const save = async () => {
    const id = await saveRecipe(recipe)
    router.push(`/recipe/${id}`)
  }
  return {
    recipe,
    save,
    setQuantity,
    scaleQuantity,
    properties: calculateRecipeProperties(recipe),
    setTitle: (title: string) => update({ ...recipe, title }),
    loadRecipe: (recipe: string) => {update(load(recipe))},
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
