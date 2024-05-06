'use server'

import {migrate, sql} from "@/db/connection";
import {emptyRecipe, Recipe} from "@/data/recipe";
import {cache} from 'react';
import {sanitize} from "@/data/persistence";


export const loadRecipe = cache(async (id: string | null): Promise<Recipe> => {
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
})

export async function saveRecipe(recipe: Recipe): Promise<string> {
    const sanitizedRecipe = sanitize(recipe)
    try {
        const recipeResult = await sql.query('INSERT INTO recipes (data) VALUES ($1) RETURNING id', [sanitizedRecipe])
        return recipeResult.rows[0].id
    } catch (e: any) {
        if (e.message === `relation "recipes" does not exist`) {
            console.log('Table does not exist, creating it now')
            await migrate()
            const recipeResult = await sql.query('INSERT INTO recipes (data) VALUES ($1) RETURNING id', [sanitizedRecipe])
            return recipeResult.rows[0].id
        } else {
            throw e
        }
    }
}
