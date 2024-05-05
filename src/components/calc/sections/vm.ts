import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import {Ingredient, IngredientType, Section, SectionType} from "@/data/recipe";
import { SectionBuilderProps, SectionBuilderVM } from "./types";
import { enrichSection } from "@/data/calculate";
import {useConfirm} from "material-ui-confirm";

function buildIngredient(type: IngredientType): Ingredient {
  switch (type) {
    case IngredientType.flour:
      return {
        name: "Flour",
        key: uuidv4(),
        type: IngredientType.flour,
        weight: 0,
      };
    case IngredientType.fluid:
      return {
        name: "Water",
        key: uuidv4(),
        type: IngredientType.fluid,
        weight: 0,
      };
    case IngredientType.salt:
      return {
        name: "Salt",
        key: uuidv4(),
        type: IngredientType.salt,
        weight: 0,
      };
    case IngredientType.yeast:
      return {
        name: "Yeast",
        key: uuidv4(),
        type: IngredientType.yeast,
        weight: 0,
      };
    case IngredientType.other:
      return {
        name: "Other",
        key: uuidv4(),
        type: IngredientType.other,
        weight: 0,
      };
    case IngredientType.starter:
      return {
        name: "Starter",
        key: uuidv4(),
        type: IngredientType.starter,
        weight: 0,
        hydration: 100
      };
  }
}

export function useSectionBuilderVm(props: SectionBuilderProps): SectionBuilderVM {
  const { initialSection, onChange } = props
  const confirm = useConfirm()
  const [section, setSection] = useState(initialSection)
  useEffect(() => {
    setSection(initialSection)
  }, [initialSection])

  const update = (changed: Section) => {
    onChange(changed);
    setSection(changed);
  };
  const scaleByFactor = (factor: number) => {
    if (factor <= 0) { return }
    props.onScale(factor);
  }

  const enrichedSection = enrichSection(section);

  return {
    section: enrichedSection,
    remove: () => confirm({ title: `Remove section ${section.name}?` })
        .then(() => props.remove(section)).catch(() => {}),
    updateHeader(name: string, type:SectionType): void {
      update({...section, name, type})
    },
    scaleByFactor,
    addIngredient: (type: IngredientType) => {
      const ingredient = buildIngredient(type);
      update({
        ...section,
        ingredients: [...section.ingredients, ingredient],
      });
      return ingredient;
    },
    removeIngredient: async (ingredient: Ingredient) => {
      try {
        await confirm({title: `Remove ingredient "${ingredient.name}"?`});
        return update({
          ...section,
          ingredients: [...section.ingredients.filter((i) => i.key !== ingredient.key)],
        });
      } catch {
      }
    },
    updateIngredient: (ingredient: Ingredient) => {
      update({
        ...section,
        ingredients: [...section.ingredients.map((i) => (i.key === ingredient.key ? ingredient : i))],
      });
    },
  };
}
