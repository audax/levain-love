export enum IngredientType {
  flour = 'flour',
  fluid = 'fluid',
  salt = 'salt',
  yeast = 'yeast',
  other = 'other',
  starter = 'starter',
}

export interface Ingredient {
  name: string;
  weight: number;
  type: IngredientType;
  key: string;
  hydration?: number;
}


export enum SectionType {
  preferment = 'preferment',
  dough = 'dough',
  soaker = 'soaker',
  other = 'other',
}

export interface Section {
  name: string
  ingredients: Ingredient[]
  type: SectionType
  key: string
}

export interface Recipe {
  title: string
  quantity: number
  sections: Section[]
}

export interface RecipeProperties {
  hydration: number
  weight: number
  flourWeight: number
  fluidWeight: number
  saltWeight: number
}

export const emptyRecipe: Recipe = {
  title: '',
  quantity: 1,
  sections: [
    {
      name: 'Dough',
      type: SectionType.dough,
      ingredients: [],
      key: 'default'
    }
  ]
}


export interface EnrichedIngredient extends Ingredient {
  pct: number
  isNew?: boolean
}

export interface EnrichedSection extends Section {
  ingredients: EnrichedIngredient[]
}
