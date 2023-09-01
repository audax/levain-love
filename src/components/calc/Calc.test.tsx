import { fireEvent, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { CalcProps, CalcVM } from '@/components/calc/types'
import { calculateRecipeProperties } from '@/data/calculate'


const vm: CalcVM = {
  recipe: defaultRecipe,
  setTitle: jest.fn(),
  updateSection: jest.fn(),
  removeSection: jest.fn(),
  addSection: jest.fn(),
  properties: calculateRecipeProperties(defaultRecipe),
  setQuantity: jest.fn(),
  scaleQuantity: jest.fn(),
  loadRecipe: jest.fn(),
  importRecipe: jest.fn()
}

const VM_SPY = jest.fn((_: CalcProps) => (vm))
jest.mock('./vm', () => ({
  useCalcVM: (props: CalcProps) => VM_SPY(props)
}))

import Calc from '@/components/calc/Calc'
import { defaultRecipe } from '@/data/_fixtures'
import { emptyRecipe } from '@/data/recipe'

describe('Calc', () => {
  const change = jest.fn()
  it('renders a recipe', () => {
    render(<Calc initialRecipe={defaultRecipe} onChange={change}/>)
    expect(VM_SPY).toHaveBeenCalledWith(
      { initialRecipe: defaultRecipe, onChange: change})
    expect(screen.getByDisplayValue('Test Recipe')).toBeInTheDocument()
    const rows = screen.getAllByRole('row').map(row => within(row))
    expect(rows[0].getByText('Hydration')).toBeInTheDocument()
    expect(rows[0].getByText('50')).toBeInTheDocument()
    expect(rows[1].getByText('Total weight')).toBeInTheDocument()
    expect(rows[1].getByText('182')).toBeInTheDocument()
    expect(rows[2].getByText('Flour weight')).toBeInTheDocument()
    expect(rows[2].getByText('120')).toBeInTheDocument()
    expect(rows[3].getByText('Fluid weight')).toBeInTheDocument()
    expect(rows[3].getByText('60')).toBeInTheDocument()
    expect(rows[4].getByText('Salt weight')).toBeInTheDocument()
    expect(rows[4].getByText('2')).toBeInTheDocument()
  })
  it('changes the title', async () => {
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
  it('adds sections', async () => {
    render(<Calc initialRecipe={defaultRecipe} onChange={change}/>)
    const button = screen.getByRole('button', {
      name: /Add section/i
    })
    await userEvent.click(button)
    expect(vm.addSection).toHaveBeenCalled()
  })
  it('exports the recipe', async () => {
    render(<Calc initialRecipe={defaultRecipe} onChange={change}/>)

    const exportString = screen.getByTestId('export').textContent ?? ''
    expect(JSON.parse(exportString)).toEqual(defaultRecipe)
  })
  it('loads the recipe', async () => {
    render(<Calc initialRecipe={emptyRecipe} onChange={change}/>)

    const loadInput = screen.getByTestId('load')

    fireEvent.change(loadInput, {target: {value: 'recipe'} })

    const button = screen.getByRole('button', {
      name: /Load recipe/i
    })
    await userEvent.click(button)

    expect(vm.loadRecipe).toHaveBeenCalledWith('recipe')
  })

  it('imports a recipe', async () => {
    render(<Calc initialRecipe={emptyRecipe} onChange={change}/>)

    const loadInput = screen.getByTestId('import')

    fireEvent.change(loadInput, {target: {value: 'import recipe'} })

    const button = screen.getByRole('button', {
      name: /Import recipe/i
    })
    await userEvent.click(button)

    expect(vm.importRecipe).toHaveBeenCalledWith('import recipe')
  })
})
