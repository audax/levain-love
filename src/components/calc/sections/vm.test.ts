import { renderHook } from "@testing-library/react"
import { useSectionBuilderVm } from "./vm"
import { emptySection, exampleSection } from "./_fixtures"
import { IngredientType, SectionType } from "@/data/recipe"
import { SectionBuilderProps } from "./types"
import { act } from "react-dom/test-utils"

const commonProps: SectionBuilderProps = {
  initialSection: exampleSection,
  onChange: jest.fn(),
}

describe('section vm', () => {
  afterEach(() => {
    jest.mocked(commonProps.onChange).mockClear()
  })

  it('exposes setters for section name and type', () => {
    const { result } = renderHook(() => useSectionBuilderVm({...commonProps}))
    act(() => {
      result.current.setName('test')
    })
    expect(commonProps.onChange).toHaveBeenCalledWith({ ...exampleSection, name: 'test' })
    jest.mocked(commonProps.onChange).mockClear()
    act(() => {
      result.current.setType(SectionType.preferment)
    })
    expect(commonProps.onChange).toHaveBeenCalledWith({ ...exampleSection, name: 'test', type: SectionType.preferment })
  })

  it('enriches ingredients with pct', () => {
    const { result } = renderHook(() => useSectionBuilderVm({...commonProps}))

    expect(result.current.section.ingredients[0].pct).toBe(100)
    expect(result.current.section.ingredients[1].pct).toBe(50)
    expect(result.current.section.ingredients[2].pct).toBe(2)
  })

  describe('adds ingredients', () => {
    Object.values(IngredientType).forEach((value) => {
      it(`adds ${value}`, () => {
        const { result } = renderHook(() => useSectionBuilderVm({...commonProps, initialSection: emptySection}))
        act(() => {
          result.current.addIngredient(value)
        })
        const changed = jest.mocked(commonProps.onChange).mock.calls[0][0]
        expect(changed.ingredients[0].type).toBe(value)
      })
    })
  })

})