import {load, sanitize, save} from "@/data/persistence";
import {defaultRecipe} from "@/data/_fixtures";
import {describe} from "@jest/globals";
import {IngredientType, SectionType} from "@/data/recipe";

describe("persistence", () => {
    it('saves a recipe and loads it again', () => {
        const persisted = save(defaultRecipe)
        expect(load(persisted)).toEqual(defaultRecipe)

    })
    describe('sanitize', () => {
      it('restricts the size of the description', () => {
          const recipe = {
              ...defaultRecipe,
              description: 'a'.repeat(1000000),
          }
          const sanitized = sanitize(recipe)

          expect(sanitized.description.length).toBeLessThanOrEqual(100000)
          expect(sanitized.description[sanitized.description.length - 1]).toEqual('…')
      });
        it('restricts the number of sections', () => {
            const recipe = {
                ...defaultRecipe,
                sections: Array(100).fill(
                    {name: 'default', type: 'dough', ingredients: []}
                )
            }
            const sanitized = sanitize(recipe)
            expect(sanitized.sections.length).toBeLessThanOrEqual(50)
        });
        it('restricts the length of names of sections and ingredients', () => {
            const recipe = {
                ...defaultRecipe,
                sections: [{
                    name: 'a'.repeat(200),
                    type: SectionType.dough,
                    key: 'default',
                    ingredients: [{
                        name: 'a'.repeat(200),
                        type: IngredientType.flour,
                        weight: 100,
                        key: 'default'
                    }]
                }]
            }
            const sanitized = sanitize(recipe)
            expect(sanitized.sections[0].name).toHaveLength(100)
            expect(sanitized.sections[0].ingredients[0].name).toHaveLength(100)

        })
    });
})
