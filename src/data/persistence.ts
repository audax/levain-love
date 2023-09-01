import {Recipe} from "@/data/recipe";

export function save(recipe: Recipe): string {
    return JSON.stringify(recipe)
}

export function load(serializedRecipe: string): Recipe {
    return JSON.parse(serializedRecipe) as Recipe
}
