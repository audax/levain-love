'use client'

import * as React from 'react';
import Calc from '@/components/calc/Calc';
import {Recipe, emptyRecipe} from '@/data/recipe';
import { ConfirmProvider } from "material-ui-confirm";

export default async function CalcWrapper({ recipe }: { recipe: Recipe | null }) {
    return (
        <ConfirmProvider>
            <Calc initialRecipe={recipe ?? emptyRecipe} onChange={console.log} />
        </ConfirmProvider>
    );
}
