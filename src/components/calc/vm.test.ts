import { renderHook } from "@testing-library/react";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: pushMock
    };
  },
}));

jest.mock("../../db/recipeDb", () => ({
  saveRecipe: jest.fn(() => Promise.resolve("test"))
}))

import { useCalcVM } from "./vm";
import { SectionType, emptyRecipe } from "@/data/recipe";
import { act } from "react-dom/test-utils";
import { defaultRecipe, scaledRecipe, sourdoughConverted, sourdoughExample } from "@/data/_fixtures";

describe("calc vm", () => {
  it("starts with the initial recipe", () => {
    const initial = {
      ...emptyRecipe,
      title: "test",
    };
    const { result } = renderHook(() => useCalcVM({ initialRecipe: initial, onChange: () => {} }))
    expect(result.current.recipe.title).toBe("test")
  });
  it('updates the title', () => {
    const onChange = jest.fn()
    const { result } = renderHook(() => useCalcVM({ initialRecipe: emptyRecipe, onChange }))
    act(() => {
      result.current.updateTitleAndQuantity('test', emptyRecipe.quantity)
    })

    expect(onChange).toHaveBeenCalledWith({ ...emptyRecipe, title: 'test' })
    expect(result.current.recipe.title).toBe('test')
  })
  it('updates the quantity', () => {
    const onChange = jest.fn()
    const { result } = renderHook(() => useCalcVM({ initialRecipe: emptyRecipe, onChange }))

    act(() => {
      result.current.updateTitleAndQuantity(emptyRecipe.title, 100)
    })

    expect(onChange).toHaveBeenCalledWith({ ...emptyRecipe, quantity: 100})
    expect(result.current.recipe.quantity).toBe(100)
  })

  it('scales the quantity', () => {
    const onChange = jest.fn()
    const { result } = renderHook(() => useCalcVM({ initialRecipe: defaultRecipe, onChange }))
    act(() => {
      result.current.scaleQuantity(2)
    })

    expect(onChange).toHaveBeenCalledWith(scaledRecipe)
  })
  it('prevents scaling quantity to 0', () => {
    const onChange = jest.fn()
    const { result } = renderHook(() => useCalcVM({ initialRecipe: defaultRecipe, onChange }))
    act(() => {
      result.current.scaleQuantity(0)
    })

    expect(onChange).not.toHaveBeenCalled()
  })

  it("scales a recipe by a given factor", () => {
    const initialRecipe = defaultRecipe;
    const { result } = renderHook(() => useCalcVM({ initialRecipe, onChange: jest.fn() }));
    const { scaleByFactor } = result.current;

    act(() => {
      scaleByFactor(2);
    });

    expect(result.current.recipe).toEqual(scaledRecipe);
  });
  it('adds a section', () => {
    const { result } = renderHook(() => useCalcVM({ initialRecipe: emptyRecipe, onChange: () => {} }))
    act(() => {
      result.current.addSection()
    })
    expect(result.current.recipe.sections.length).toBe(2)
  })
  it('removes a section', () => {
    const { result } = renderHook(() => useCalcVM({ initialRecipe: emptyRecipe, onChange: () => {} }))
    act(() => {
      result.current.removeSection(result.current.recipe.sections[0])
    })
    expect(result.current.recipe.sections.length).toBe(0)
  })
  it('updates a section', () => {
    const { result } = renderHook(() => useCalcVM({ initialRecipe: emptyRecipe, onChange: () => {} }))

    act(() => {
      result.current.updateSection({ key: 'default', name: 'test', type: SectionType.dough, ingredients: [] })
    })

    expect(result.current.recipe.sections[0].name).toBe('test')
  })
  it('loads a recipe', () => {
    const { result } = renderHook(() => useCalcVM({ initialRecipe: emptyRecipe, onChange: () => {} }))

    act(() => {
      result.current.loadRecipe(JSON.stringify(defaultRecipe))
    })

    expect(result.current.recipe).toEqual(defaultRecipe)
  })
  it('imports a recipe', () => {
    const { result } = renderHook(() => useCalcVM({ initialRecipe: emptyRecipe, onChange: () => {} }))

    act(() => {
      result.current.importRecipe(JSON.stringify(sourdoughExample))
    })

    expect(result.current.recipe).toEqual(sourdoughConverted)
  })
  it('saves a recipe', async () => {
    const {result} = renderHook(() => useCalcVM({
      initialRecipe: emptyRecipe, onChange: () => {
      }
    }))
    await act(async () => {
      await result.current.save()
    })
    // navigate to the new recipe page, the id is returned from the saveRecipe mock
    expect(pushMock).toHaveBeenCalledWith('/recipe/test')
  })
  it('indicates a modified recipe', async () => {
    const {result} = renderHook(() => useCalcVM({ initialRecipe: emptyRecipe, onChange: () => {} }))
    expect(result.current.modified).toBe(false)
    act(() => {
      result.current.updateTitleAndQuantity('new title', 1)
    })
    expect(result.current.modified).toBe(true)

  })

});
