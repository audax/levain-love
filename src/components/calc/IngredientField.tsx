import * as React from 'react';
import { Ingredient } from '../../data/recipe';

interface IngredientFieldProps {
  ingredient: Ingredient
  onChange: (dough: Ingredient) => void
}
export default function IngredientField(props: IngredientFieldProps) {
  const { ingredient, onChange } = props
  return (
    <></>
  );
}