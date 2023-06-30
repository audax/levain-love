import { renderHook } from "@testing-library/react";
import { useCalcVM } from "./vm";
import { SectionType, emptyRecipe } from "@/data/recipe";
import { act } from "react-dom/test-utils";

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
      result.current.setTitle('test')
    })

    expect(onChange).toHaveBeenCalledWith({ ...emptyRecipe, title: 'test' })
    expect(result.current.recipe.title).toBe('test')
  })
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
});
