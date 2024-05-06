import { useState } from "react";
import {emptyRecipe, Recipe, Section, SectionType} from "@/data/recipe";
import { CalcProps, CalcVM } from "./types";
import {calculateRecipeProperties, scaleRecipeByFactor, scaleRecipeByQuantity} from "@/data/calculate";
import { v4 as uuidv4 } from 'uuid';
import { importRecipe } from "@/data/import";
import {load} from "@/data/persistence";
import {useRouter} from "next/navigation";
import {saveRecipe} from "@/db/recipeDb";
import {useConfirm} from "material-ui-confirm";

function buildSection(): Section {
  return {
    name: 'New Section',
    key: uuidv4(),
    type: SectionType.dough,
    ingredients: []
  }
}

export function useCalcVM(props: Readonly<CalcProps>): CalcVM {
  const { initialRecipe, onChange } = props;
  const confirm = useConfirm()
  const [recipe, setRecipe] = useState(initialRecipe);
  const router = useRouter()
  const [modified, setModified] = useState(false)
  const update = (changed: Recipe) => {
    onChange(changed);
    setRecipe(changed);
    setModified(true)
  }
  const scaleQuantity = (quantity: number) => {
    if (quantity <= 0) { return }
    update(scaleRecipeByQuantity(recipe, quantity))
  }
  const scaleByFactor = (factor: number) => {
    if (factor <= 0) { return }
    update(scaleRecipeByFactor(recipe, factor))
  }

  const save = async () => {
    const id = await saveRecipe(recipe)
    router.push(`/recipe/${id}`)
  }
  const clear = () => confirm({ title: 'Clear recipe?', description: 'Are you sure you want to clear the recipe?' })
      .then(() => {
        setRecipe(emptyRecipe)
        router.push('/')
      })

  return {
    recipe,
    save,
    clear,
    scaleQuantity,
    scaleByFactor,
    modified,
    properties: calculateRecipeProperties(recipe),
    updateTitleAndQuantity: (title: string, quantity: number) => update({...recipe, title, quantity}),
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
      }),
    updateDescription(description: string) {
      update({...recipe, description})
    }
  };
}
