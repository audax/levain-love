import 'reflect-metadata';
import * as D from "@/data/recipe";

import {IsString, MaxLength, IsArray, ArrayMaxSize, ValidateNested, IsNumber} from 'class-validator';
import {instanceToPlain, plainToClass, Transform, Type} from 'class-transformer';


export function save(recipe: D.Recipe): string {
    return JSON.stringify(recipe)
}

export function load(serializedRecipe: string): D.Recipe {
    return JSON.parse(serializedRecipe) as D.Recipe
}

function ellipse(maxLength: number): (params: { value: string}) => string {
    const maxOriginalLength = maxLength - 1;
    return ({ value } ) => (value.length > maxOriginalLength ? value.slice(0, maxOriginalLength) + '…' : value)
}


class Ingredient implements D.Ingredient {
  @IsString()
  @MaxLength(100)
  @Transform(ellipse(100))
  name: string = '';

  @IsString()
  @MaxLength(100)
  @Transform(ellipse(100))
  key: string = '';

  @IsNumber()
  weight: number = 0;

  @IsString()
  @MaxLength(100)
  @Transform(ellipse(100))
  type: D.IngredientType = D.IngredientType.other;
}

class Section implements D.Section {
  @IsString()
  @MaxLength(100)
  @Transform(ellipse(100))
  name: string = '';

  @IsArray()
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => Ingredient)
  @Transform(({ value }) => value.slice(0, 50))
  ingredients: Ingredient[] = [];

  @IsString()
  @MaxLength(100)
  @Transform(ellipse(100))
  key: string = '';

  @IsString()
  @MaxLength(100)
  @Transform(ellipse(100))
  type: D.SectionType = D.SectionType.other;
}

export class Recipe implements D.Recipe {
  @IsString()
  @MaxLength(100000)
  @Transform(ellipse(100000))
  description: string = '';

  @IsArray()
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => Section)
  @Transform(({ value }) => value.slice(0, 50))
  sections: Section[] = [];

  @IsString()
  @MaxLength(150)
  @Transform(ellipse(150))
  title: string = '';

  @IsNumber()
  quantity: number = 0;

}

export function sanitize(recipe: D.Recipe): Recipe {
    const sanitized = (plainToClass(Recipe, recipe, { enableImplicitConversion: true }))
    return instanceToPlain(sanitized) as D.Recipe
}
