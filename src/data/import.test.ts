import { exampleForImport, convertedExample, sourdoughExample, sourdoughConverted } from "./_fixtures";
import { importRecipe } from "./import";

describe("importRecipe", () => {
  it("imports the simple example recipe", () => {
    const result = importRecipe(exampleForImport);
    expect(result).toEqual(convertedExample);
  });
  it("imports the sourdough example recipe", () => {
    const result = importRecipe(sourdoughExample);
    expect(result).toEqual(sourdoughConverted);
  })
});
