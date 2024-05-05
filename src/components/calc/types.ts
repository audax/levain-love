import { Recipe, RecipeProperties, Section } from "@/data/recipe";

export interface CalcProps {
  readonly initialRecipe: Recipe;
  readonly onChange: (recipe: Recipe) => void;
}

export interface CalcVM {
  importRecipe(arg0: string): unknown;
  loadRecipe(value: string): void;
  updateTitleAndQuantity(name: string, quantity: number): void;
  updateSection(section: Section): void;
  removeSection(section: Section): void;
  readonly recipe: Recipe;
  readonly addSection: () => void;
  readonly properties: RecipeProperties
  readonly scaleQuantity: (quantity: number) => void;
  save(): Promise<void>;
  readonly modified: boolean
}
