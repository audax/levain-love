import { EnrichedSection, Ingredient, IngredientType, Section, SectionType } from "@/data/recipe";


export interface SectionBuilderVM {
  updateHeader(name: string, type: SectionType): void;
  section: EnrichedSection;
  addIngredient(type: IngredientType): Ingredient;
  removeIngredient(ingredient: Ingredient): Promise<void>;
  updateIngredient(ingredient: Ingredient): void;
  remove(): Promise<void>;
  scaleByFactor(factor: number): void;
}

export interface SectionBuilderProps {
  initialSection: Section;
  onChange(section: Section): void;
  onScale(factor: number): void;
  remove(section: Section): void;
}
