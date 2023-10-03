import { Recipe, RecipeProperties, Section } from "@/data/recipe";

export interface CalcProps {
  initialRecipe: Recipe;
  onChange: (recipe: Recipe) => void;
}

export interface CalcVM {
  importRecipe(arg0: string): unknown;
  loadRecipe(value: string): void;
  updateSection(section: Section): void;
  removeSection(section: Section): void;
  recipe: Recipe;
  setTitle: (title: string) => void;
  addSection: () => void;
  properties: RecipeProperties
  setQuantity: (quantity: number) => void;
  scaleQuantity: (quantity: number) => void;
  save(): Promise<void>;
  modified: boolean
}
