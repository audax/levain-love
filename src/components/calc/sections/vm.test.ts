import { renderHook } from "@testing-library/react"
import { useSectionBuilderVm } from "./vm"
import { emptySection, exampleSection } from "./_fixtures"
import { IngredientType, SectionType } from "@/data/recipe"
import { SectionBuilderProps } from "./types"
import { act } from "react-dom/test-utils"

const commonProps: SectionBuilderProps = {
  initialSection: exampleSection,
  onChange: jest.fn(),
  remove: jest.fn()
}

describe('section vm', () => {
  afterEach(() => {
    jest.mocked(commonProps.onChange).mockClear()
  })
  it('exposes state and setters for edit mode', () => {
    const { result } = renderHook(() => useSectionBuilderVm({...commonProps}))
    expect(result.current.editMode).toBe(false)
    act(() => {
      result.current.startEdit()
    })
    expect(result.current.editMode).toBe(true)
  })
  it('cancels edit mode', () => {
    const { result } = renderHook(() => useSectionBuilderVm({...commonProps}))
    act(() => {
      result.current.startEdit()
      result.current.setName('new name')
      result.current.setType(SectionType.preferment)
      result.current.cancelEdit()
    })
    expect(result.current.editMode).toBe(false)
    expect(result.current.name).toBe('dough-section')
    expect(result.current.type).toBe(SectionType.dough)
    expect(commonProps.onChange).not.toHaveBeenCalled()
  })
  it('commits from edit mode', () => {
    const { result } = renderHook(() => useSectionBuilderVm({...commonProps}))
    act(() => {
      result.current.startEdit()
    })
    act(() => {
      result.current.setName('new name')
      result.current.setType(SectionType.preferment)
    })
    act(() => {
      result.current.commitEdit()
    })
    expect(result.current.name).toBe('new name')
    expect(result.current.type).toBe(SectionType.preferment)
    expect(result.current.editMode).toBe(false)
    expect(commonProps.onChange).toHaveBeenCalledWith({ ...exampleSection, name: 'new name', type: SectionType.preferment })
  })

  it('exposes state for section name and type', () => {
    const { result } = renderHook(() => useSectionBuilderVm({...commonProps}))
    expect(result.current.name).toBe('dough-section')
    expect(result.current.type).toBe(SectionType.dough)
  })

  it('enriches ingredients with pct', () => {
    const { result } = renderHook(() => useSectionBuilderVm({...commonProps}))

    expect(result.current.section.ingredients[0].pct).toBe(100)
    expect(result.current.section.ingredients[1].pct).toBe(50)
    expect(result.current.section.ingredients[2].pct).toBe(2)
  })

  it('removes itself', () => {
    const { result } = renderHook(() => useSectionBuilderVm({...commonProps}))
    act(() => {
      result.current.remove()
    })

    expect(commonProps.remove).toHaveBeenCalledWith(commonProps.initialSection)

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
