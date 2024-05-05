import { v4 as uuidv4 } from "uuid";
import { Recipe, Section, Ingredient, IngredientType, SectionType } from "./recipe";

function mapSectionType(type: string): SectionType {
  return {
    dough: SectionType.dough,
    preferment: SectionType.preferment,
    soaker: SectionType.soaker,
    misc: SectionType.other,
  }[type] ?? SectionType.other;
}

export function importRecipe(recipe: any): Recipe {
  const sections: Section[] = recipe.sections.map((section: any) => {
    const ingredients: Ingredient[] = section.ingredients.map((ingredient: any) => {
      let type: IngredientType;
      if (ingredient.type === "dairy") {
        type = IngredientType.fluid;
      } else if (Object.values(IngredientType).includes(ingredient.type)) {
        type = ingredient.type;
      } else {
        type = IngredientType.other;
      }
      if (type == IngredientType.starter) {
        return {
          weight: ingredient.weight,
          type,
          name: ingredient.name,
          hydration: ingredient.hydration,
          key: uuidv4(),
        };

      }
      return {
        weight: ingredient.weight,
        type,
        name: ingredient.name,
        key: uuidv4(),
      };
    });
    return {
      name: section.name,
      type: mapSectionType(section.type),
      ingredients,
      key: uuidv4(),
    };
  });
  return {
    title: recipe.name,
    quantity: recipe.quantity,
    sections,
    description: '',
  };
}
