import { EnrichedIngredient, EnrichedSection, IngredientType, Recipe, RecipeProperties, Section, SectionType } from "./recipe";
import { produce } from "immer";

function calculateFlourAndWaterWeights(hydration: number, weight: number) {
  const flourWeight = weight / (1 + hydration / 100);
  const fluidWeight = weight - flourWeight;
  return { flourWeight, fluidWeight };
}

export function calculateRecipeProperties(recipe: Recipe): RecipeProperties {
  const { sections } = recipe;
  const { flour, fluid, salt, weight } = sections.reduce(
    (acc, section) => {
      section.ingredients.forEach((ingredient) => {
        acc.weight += ingredient.weight;
        if (ingredient.type === IngredientType.flour) {
          acc.flour += ingredient.weight;
        } else if (ingredient.type === IngredientType.fluid && section.type !== SectionType.soaker) {
          acc.fluid += ingredient.weight;
        } else if (ingredient.type === IngredientType.salt) {
          acc.salt += ingredient.weight;
        } else if (ingredient.type === IngredientType.starter) {
          const hydration = ingredient.hydration ?? 100;
          const { flourWeight, fluidWeight } = calculateFlourAndWaterWeights(hydration, ingredient.weight);
          acc.flour += flourWeight;
          acc.fluid += fluidWeight;
        }
      });
      return acc;
    },
    { flour: 0, fluid: 0, salt: 0, weight: 0 }
  );

  const hydration = flour === 0 ? 0 : (fluid / flour) * 100;
  const weightPerBread = weight / recipe.quantity;
  const flourWeight = flour;
  const fluidWeight = fluid;
  const saltWeight = salt;

  return {
    hydration,
    weight,
    weightPerBread,
    flourWeight,
    fluidWeight,
    saltWeight,
  };
}

export function scaleRecipe(recipe: Recipe, quantity: number): Recipe {
  return produce(recipe, (draft) => {
    const factor = quantity / recipe.quantity;
    draft.quantity = quantity;
    draft.sections.forEach((section) => {
      section.ingredients.forEach((ingredient) => {
        ingredient.weight *= factor;
      });
    });
    return draft;
  });
}

export function enrichSection(section: Section): EnrichedSection {
  // the sum of all flour ingredients weights is 100%
  // each other ingredients weight is a percentage of the total flour weight
  const flourWeight = section.ingredients.reduce((acc, ingredient) => {
    if (ingredient.type === IngredientType.flour) {
      acc += ingredient.weight;
    }
    return acc;
  }, 0);

  const enrichedIngredients: EnrichedIngredient[] = section.ingredients.map((ingredient) => {
    const pct = flourWeight === 0 ? 0 : (ingredient.weight / flourWeight) * 100;
    return {
      ...ingredient,
      pct,
    };
  });

  return {
    ...section,
    ingredients: enrichedIngredients,
  };
}
