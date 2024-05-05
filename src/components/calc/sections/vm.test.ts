import { renderHook } from "@testing-library/react"

const confirmSpy = jest.fn(() => Promise.resolve());
jest.mock("material-ui-confirm", () => ({
  useConfirm: () => confirmSpy,
}));

import { useSectionBuilderVm } from "./vm"
import { emptySection, exampleSection } from "./_fixtures"
import { IngredientType, SectionType } from "@/data/recipe"
import { SectionBuilderProps } from "./types"
import { act } from "react-dom/test-utils"

const commonProps: SectionBuilderProps = {
  initialSection: exampleSection,
  onChange: jest.fn(),
  onScale: jest.fn(),
  remove: jest.fn()
}

describe('section vm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('updates the header', async () => {
    const {result} = renderHook(() => useSectionBuilderVm({...commonProps}))
    await act(async () => {
      result.current.updateHeader('new name', SectionType.preferment)
    })
    expect(commonProps.onChange).toHaveBeenCalledWith({...exampleSection, name: 'new name', type: SectionType.preferment})
  })
  it('removes ingredients', async () => {
    const {result} = renderHook(() => useSectionBuilderVm({...commonProps}))
    await act(async () => {
      await result.current.removeIngredient(exampleSection.ingredients[0])
    })
    expect(confirmSpy).toHaveBeenCalled()
    expect(commonProps.onChange).toHaveBeenCalledWith({...exampleSection, ingredients: [exampleSection.ingredients[1], exampleSection.ingredients[2]]})
  })
  it('removes section', async () => {
    const {result} = renderHook(() => useSectionBuilderVm({...commonProps}))
    await act(async () => {
      await result.current.remove()
    })
    expect(confirmSpy).toHaveBeenCalled()
    expect(commonProps.remove).toHaveBeenCalledWith(commonProps.initialSection)
  })
  it('enriches ingredients with pct', () => {
    const { result } = renderHook(() => useSectionBuilderVm({...commonProps}))

    expect(result.current.section.ingredients[0].pct).toBe(100)
    expect(result.current.section.ingredients[1].pct).toBe(50)
    expect(result.current.section.ingredients[2].pct).toBe(2)
  })

  it('removes itself', async () => {
    const { result } = renderHook(() => useSectionBuilderVm({...commonProps}))
    await act(result.current.remove)

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
  describe('scale functionality', () => {
    it('calls onScale with the correct factor when scaleByFactor is called', () => {
      const onScale = jest.fn();
      const { result } = renderHook(() => useSectionBuilderVm({...commonProps, onScale}));

      act(() => {
        result.current.scaleByFactor(2);
      });

      expect(onScale).toHaveBeenCalledWith(2);
    });
  });

})
