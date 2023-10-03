import { EnrichedSection, Ingredient, IngredientType, Section, SectionType } from "@/data/recipe";


export interface SectionBuilderVM {
  commitEdit(): void;
  type: SectionType;
  name: string
  cancelEdit(): void;
  editMode: boolean;
  startEdit(): void;
  section: EnrichedSection;
  setName: (name: string) => void;
  setType: (type: SectionType) => void;
  addIngredient: (type: IngredientType) => Ingredient;
  removeIngredient: (ingredient: Ingredient) => void;
  updateIngredient: (ingredient: Ingredient) => void;
  remove: () => void;
}

export interface SectionBuilderProps {
  initialSection: Section;
  onChange: (section: Section) => void;
  remove: (section: Section) => void;
}
