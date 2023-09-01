import {load, save} from "@/data/persistence";
import {defaultRecipe} from "@/data/_fixtures";

describe("persistence", () => {
    it('saves a recipe and loads it again', () => {
        const persisted = save(defaultRecipe)
        expect(load(persisted)).toEqual(defaultRecipe)

    })
})
