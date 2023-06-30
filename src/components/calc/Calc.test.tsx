import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { IngredientType, Recipe, SectionType, emptyRecipe } from '@/data/recipe'
import { CalcProps, CalcVM } from '@/components/calc/types'
import { calculateRecipeProperties } from '@/data/calculate'

const defaultRecipe: Recipe = {
  ...emptyRecipe,
  title: 'Test Recipe',
  sections: [
    {
      name: "preferment",
      type: SectionType.preferment,
      key: 'foobar',
      ingredients: [
        { name: "flour", weight: 20, pct: 100, type: IngredientType.flour },
        { name: "water", weight: 10, pct: 50, type: IngredientType.fluid },
      ]
    },
    {
      name: "dough",
      type: SectionType.dough,
      key: 'default',
      ingredients: [
        { name: "flour", weight: 100, pct: 100, type: IngredientType.flour },
        { name: "water", weight: 50, pct: 50, type: IngredientType.fluid },
        { name: "salt", weight: 2, pct: 2, type: IngredientType.salt}
      ],
    },
  ],
}

const vm: CalcVM = {
  recipe: defaultRecipe,
  setTitle: jest.fn(),
  updateSection: jest.fn(),
  removeSection: jest.fn(),
  addSection: jest.fn(),
  properties: calculateRecipeProperties(defaultRecipe),
}

const VM_SPY = jest.fn((props: CalcProps) => (vm))
jest.mock('./vm', () => ({
  useCalcVM: (props: CalcProps) => VM_SPY(props)
}))
 
import Calc from '@/components/calc/Calc'

describe('Calc', () => {
  const change = jest.fn()
  it('renders a recipe', () => {
    render(<Calc initialRecipe={defaultRecipe} onChange={change}/>)
    expect(VM_SPY).toHaveBeenCalledWith(
      { initialRecipe: defaultRecipe, onChange: change})
    expect(screen.getByDisplayValue('Test Recipe')).toBeInTheDocument()
    expect(screen.getByLabelText('Recipe name')).toHaveValue('Test Recipe')
    expect(screen.getByLabelText('Hydration')).toHaveValue('50')
    expect(screen.getByLabelText('Weight')).toHaveValue('182')
    expect(screen.getByLabelText('Flour weight')).toHaveValue('120') 
    expect(screen.getByLabelText('Fluid weight')).toHaveValue('60')
    expect(screen.getByLabelText('Salt weight')).toHaveValue('2')
  })
  it('changes the title', async () => {
    const change = jest.fn()
    render(<Calc initialRecipe={defaultRecipe} onChange={change}/>)
    expect(VM_SPY).toHaveBeenCalledWith(
      { initialRecipe: defaultRecipe, onChange: change})
    const input = screen.getByLabelText('Recipe name')
    await userEvent.clear(input)

    expect(vm.setTitle).toHaveBeenCalledWith('')

    jest.mocked(vm.setTitle).mockClear()
    await userEvent.type(input, '+')
    
    expect(vm.setTitle).toHaveBeenCalledWith('Test Recipe+')
  })
  it('renders properties', () => {
  })
})