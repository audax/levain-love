import * as React from 'react';
import RecipeBuilder from "@/layouts/RecipeBuilder/RecipeBuilder";
import {loadRecipe} from "@/db/recipeDb";


export default async function RecipePage({params}: { params: { id: string } }) {
    const recipe = await loadRecipe(params.id)
    return <RecipeBuilder recipe={recipe}/>
}
