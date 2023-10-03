'use Server'

import * as React from 'react';
import RecipeBuilder from "@/layouts/RecipeBuilder/RecipeBuilder";
import {emptyRecipe} from "@/data/recipe";

export default function RootPage() {
  return <RecipeBuilder recipe={ emptyRecipe }/>;
}
