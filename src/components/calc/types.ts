import { Recipe, RecipeProperties, Section } from "@/data/recipe";

export interface CalcProps {
  readonly initialRecipe: Recipe;
  readonly onChange: (recipe: Recipe) => void;
}

export interface CalcVM {
  importRecipe(arg0: string): unknown;
  loadRecipe(value: string): void;
  updateTitleAndQuantity(title: string, quantity: number): void;
  updateSection(section: Section): void;
  removeSection(section: Section): void;
  addSection(): void;
  scaleQuantity(quantity: number): void;
  save(): Promise<void>;
  readonly recipe: Recipe;
  readonly properties: RecipeProperties
  readonly modified: boolean
}
