import { renderHook } from "@testing-library/react"
import { useSectionBuilderVm } from "./vm"
import { exampleSection } from "./_fixtures"
import { SectionType } from "@/data/recipe"

describe('section vm', () => {
  it('exposes setters for section name and type', () => {
    const onChange = jest.fn()
    const { result } = renderHook(() => useSectionBuilderVm({ initialSection: exampleSection, onChange}))
    result.current.setName('test')
    expect(onChange).toHaveBeenCalledWith({ ...exampleSection, name: 'test' })
    onChange.mockClear()
    result.current.setType(SectionType.preferment)
    expect(onChange).toHaveBeenCalledWith({ ...exampleSection, type: SectionType.preferment })
  })

})