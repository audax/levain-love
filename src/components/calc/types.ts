import { Recipe, RecipeProperties, Section } from "@/data/recipe";

export interface CalcProps {
  initialRecipe: Recipe;
  onChange: (recipe: Recipe) => void;
}

export interface CalcVM {
  updateSection(section: Section): void;
  removeSection(section: Section): void;
  recipe: Recipe;
  setTitle: (title: string) => void;
  addSection: () => void;
  properties: RecipeProperties
}
