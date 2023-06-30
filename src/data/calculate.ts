import { IngredientType, Recipe, RecipeProperties, Section } from "./recipe"
import {produce} from 'immer'

export function calculateRecipeProperties(recipe: Recipe): RecipeProperties {
  const { sections } = recipe;
  const { flour, fluid, salt, weight } = sections.reduce((acc, section) => {
    section.ingredients.forEach((ingredient) => {
      acc.weight += ingredient.weight;
      if (ingredient.type === IngredientType.flour) {
        acc.flour += ingredient.weight;
      } else if (ingredient.type === IngredientType.fluid) {
        acc.fluid += ingredient.weight;
      } else if (ingredient.type === IngredientType.salt) {
        acc.salt += ingredient.weight;
      }
    });
    return acc;
  }, { flour: 0, fluid: 0, salt: 0, weight: 0 });

  const hydration = flour === 0 ? 0 : (fluid / flour) * 100;
  const flourWeight = flour
  const fluidWeight = fluid
  const saltWeight = salt;

  return {
    hydration,
    weight,
    flourWeight,
    fluidWeight,
    saltWeight
  }
}

export function scaleRecipe(recipe: Recipe, quantity: number): Recipe {
  return produce(recipe, draft => {
    const factor = quantity / recipe.quantity
    draft.quantity = quantity
    draft.sections.forEach(section => {
      section.ingredients.forEach(ingredient => {
        ingredient.weight *= factor
      })
    })
    return draft
  })
}