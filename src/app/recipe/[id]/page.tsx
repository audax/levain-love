import * as React from 'react';
import RecipeBuilder from "@/layouts/RecipeBuilder/RecipeBuilder";
import {loadRecipe} from "@/db/recipeDb";
import { Metadata } from 'next'

export async function generateMetadata({params}: { params: { id: string } }): Promise<Metadata> {
    const recipe = await loadRecipe(params.id)
    return {
        title: recipe.title,
        description: recipe.description,
        applicationName: 'Levain Love',
    }
}

export default async function RecipePage({params}: { params: { id: string } }) {
    const recipe = await loadRecipe(params.id)
    return <RecipeBuilder recipe={recipe}/>
}
