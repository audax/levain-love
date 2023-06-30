export enum IngredientType {
  flour = 'flour',
  fluid = 'fluid',
  salt = 'salt',
  yeast = 'yeast',
  starter = 'starter',
  other = 'other',
}

export interface Ingredient {
  name: string;
  weight: number;
  pct: number;
  type: IngredientType;
}


export enum SectionType {
  preferment = 'preferment',
  dough = 'dough',
}

export interface Section {
  name: string
  ingredients: Ingredient[]
  type: SectionType
  key: string
}

export interface Recipe {
  title: string
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
  sections: [
    {
      name: 'Dough',
      type: SectionType.dough,
      ingredients: [],
      key: 'default'
    }
  ]
}
