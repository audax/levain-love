import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { Ingredient, IngredientType, Section, SectionType } from "@/data/recipe";
import { SectionBuilderProps, SectionBuilderVM } from "./types";
import { enrichSection } from "@/data/calculate";

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
  const { initialSection, onChange } = props;
  const [section, setSection] = useState(initialSection);
  useEffect(() => {
    setSection(initialSection)
  }, [initialSection])
  const update = (changed: Section) => {
    onChange(changed);
    setSection(changed);
  };

  const enrichedSection = enrichSection(section);

  return {
    section: enrichedSection,
    setName: (name: string) => update({ ...section, name }),
    setType: (type: SectionType) => update({ ...section, type }),
    addIngredient: (type: IngredientType) => {
      const ingredient = buildIngredient(type);
      update({
        ...section,
        ingredients: [...section.ingredients, ingredient],
      });
      return ingredient;
    },
    removeIngredient: (ingredient: Ingredient) =>
      update({
        ...section,
        ingredients: [...section.ingredients.filter((i) => i.key !== ingredient.key)],
      }),
    updateIngredient: (ingredient: Ingredient) => {
      console.log("updateIngredient", ingredient);
      update({
        ...section,
        ingredients: [...section.ingredients.map((i) => (i.key === ingredient.key ? ingredient : i))],
      });
    },
  };
}
