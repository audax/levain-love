import { Ingredient, IngredientType, Section, SectionType } from "@/data/recipe";


export interface SectionBuilderVM {
  section: Section;
  setName: (name: string) => void;
  setType: (type: SectionType) => void;
  addIngredient: (type: IngredientType) => Ingredient;
  removeIngredient: (ingredient: Ingredient) => void;
  updateIngredient: (ingredient: Ingredient) => void;
}

export interface SectionBuilderProps {
  initialSection: Section;
  onChange: (section: Section) => void;
}