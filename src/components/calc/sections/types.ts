import { Ingredient, IngredientType, Section, SectionType } from "@/data/recipe";


export interface EnrichedIngredient extends Ingredient {
  isNew?: boolean
}

export interface EnrichedSection extends Section {
  ingredients: EnrichedIngredient[]
}

export interface SectionBuilderVM {
  section: EnrichedSection;
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