import { renderHook } from "@testing-library/react"
import { useSectionBuilderVm } from "./vm"
import { exampleSection } from "./_fixtures"
import { SectionType } from "@/data/recipe"
import { SectionBuilderProps } from "./types"

const commonProps: SectionBuilderProps = {
  initialSection: exampleSection,
  onChange: jest.fn(),
}

describe('section vm', () => {
  it('exposes setters for section name and type', () => {
    const { result } = renderHook(() => useSectionBuilderVm({...commonProps}))
    result.current.setName('test')
    expect(commonProps.onChange).toHaveBeenCalledWith({ ...exampleSection, name: 'test' })
    jest.mocked(commonProps.onChange).mockClear()
    result.current.setType(SectionType.preferment)
    expect(commonProps.onChange).toHaveBeenCalledWith({ ...exampleSection, type: SectionType.preferment })
  })

  it('enriches ingredients with pct', () => {
    const { result } = renderHook(() => useSectionBuilderVm({...commonProps}))

    expect(result.current.section.ingredients[0].pct).toBe(100)
    expect(result.current.section.ingredients[1].pct).toBe(50)
    expect(result.current.section.ingredients[2].pct).toBe(2)
  })

})