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
  importRecipe: jest.fn(),
  save: jest.fn(),
}

const VM_SPY = jest.fn((_: CalcProps) => (vm))
jest.mock('./vm', () => ({
  useCalcVM: (props: CalcProps) => VM_SPY(props)
}))
const confirmSpy = jest.fn(() => Promise.resolve());
jest.mock("material-ui-confirm", () => ({
  useConfirm: () => confirmSpy,
}));

import Calc from '@/components/calc/Calc'
import { defaultRecipe } from '@/data/_fixtures'
import { emptyRecipe } from '@/data/recipe'

describe('Calc', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const change = jest.fn()
  it('renders a recipe', () => {
    render(<Calc initialRecipe={defaultRecipe} onChange={change}/>)
    expect(VM_SPY).toHaveBeenCalledWith(
      { initialRecipe: defaultRecipe, onChange: change})
    expect(screen.getByText('Test Recipe')).toBeInTheDocument()
    const rows = within(screen.getByTestId('recipe-properties'))
        .getAllByRole('row').map(row => within(row))
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
  it('changes the title and quantity', async () => {
    render(<Calc initialRecipe={defaultRecipe} onChange={change}/>)
    expect(VM_SPY).toHaveBeenCalledWith(
      { initialRecipe: defaultRecipe, onChange: change})
    await userEvent.click(screen.getByRole('button', { 'name': /edit recipe header/i }))
    const nameInput = screen.getByLabelText('Name')
    await userEvent.clear(nameInput)
    await userEvent.type(nameInput, 'New recipe name')

    const quantityInput = screen.getByLabelText('Quantity')
    await userEvent.type(quantityInput, '00')

    await userEvent.click(screen.getByRole('button', { 'name': /confirm edit/i }))

    expect(vm.setTitle).toHaveBeenCalledWith('New recipe name')
    expect(vm.setQuantity).toHaveBeenCalledWith(100)

  })
  it('adds sections', async () => {
    render(<Calc initialRecipe={defaultRecipe} onChange={change}/>)
    const button = screen.getByRole('button', {
      name: /Add section/i
    })
    await userEvent.click(button)
    expect(vm.addSection).toHaveBeenCalled()
  })
  it('removes sections', async () => {
    render(<Calc initialRecipe={defaultRecipe} onChange={change}/>)
    const removeButtons = await screen.findAllByRole('button', {
      name: /remove section/i
    })
    await userEvent.click(removeButtons[0])
    expect(vm.removeSection).toHaveBeenCalledWith(defaultRecipe.sections[0])
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
  it('saves a recipe', async () => {
    render(<Calc initialRecipe={emptyRecipe} onChange={change}/>)

    const button = screen.getByRole('button', {
      name: /Save recipe/i
    })
    await userEvent.click(button)

    expect(vm.save).toHaveBeenCalled()
  })
  describe('updating qantity', () => {
    beforeEach(async () => {
      render(<Calc initialRecipe={defaultRecipe} onChange={change}/>)
      await userEvent.click(screen.getByRole('button', { 'name': /edit recipe header/i }))

    })
    it('scales the quantity to a valid value', async () => {
      const input = screen.getByLabelText('Quantity')
      await userEvent.clear(input)
      await userEvent.type(input, '10')
      await userEvent.click(screen.getByRole('button', { 'name': /scale recipe/i }))
      expect(vm.scaleQuantity).toHaveBeenCalledWith(10)
    })
    it('prevents scaling and setting the quantity to a value < 1', async () => {
      // edit quantity to illegal value of 0
      const input = screen.getByLabelText('Quantity')
      await userEvent.clear(input)
      await userEvent.type(input, '0')
      await userEvent.click(screen.getByRole('button', { 'name': /scale recipe/i }))
      // scaling should be ignored if the value is < 1
      expect(vm.scaleQuantity).not.toHaveBeenCalledWith(1)

      // confirming the edit should reset the value to 1
      await userEvent.click(screen.getByRole('button', { 'name': /confirm edit/i }))
      const quantity= screen.getByTestId('recipe-quantity')
      expect(quantity).toHaveTextContent('1')

      // back into edit mode, the text field should be reset to a value of 1
      await userEvent.click(screen.getByRole('button', { 'name': /edit recipe header/i }))
      expect(screen.getByLabelText('Quantity')).toHaveValue(1)
    })
  })
})
