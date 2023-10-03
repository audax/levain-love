'use server'

import {migrate, sql} from "@/db/connection";
import {emptyRecipe, Recipe} from "@/data/recipe";

export async function loadRecipe(id: string | null): Promise<Recipe> {
    await migrate()
    try {
        const { rows } = await sql`SELECT data FROM recipes WHERE id=${id}`
        return rows[0].data as Recipe
    } catch (e: any) {
        if (e.message === `relation "recipes" does not exist`) {
            console.log('Table does not exist, creating it now')
            await migrate()
        } else {
            throw e
        }
    }
    return emptyRecipe
}

export async function saveRecipe(recipe: Recipe): Promise<string> {
    console.log('saveRecipe')
    await migrate()
    const recipeResult = await sql`INSERT INTO recipes (data) VALUES ${JSON.stringify(recipe)} `
    console.log(recipeResult)
    return 'abc'
}
