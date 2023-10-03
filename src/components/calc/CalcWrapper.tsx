'use client'

import * as React from 'react';
import Calc from '@/components/calc/Calc';
import {Recipe, emptyRecipe} from '@/data/recipe';

export default async function CalcWrapper({ recipe }: { recipe: Recipe | null }) {
    return (
        <Calc initialRecipe={recipe ?? emptyRecipe} onChange={console.log} />
    );
}
