import { fireEvent, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { CalcProps, CalcVM } from '@/components/calc/types'
import { calculateRecipeProperties } from '@/data/calculate'


const vm: CalcVM = {
  recipe: defaultRecipe,
  updateTitleAndQuantity: jest.fn(),
  updateDescription: jest.fn(),
  updateSection: jest.fn(),
  removeSection: jest.fn(),
  addSection: jest.fn(),
  properties: calculateRecipeProperties(defaultRecipe),
  scaleQuantity: jest.fn(),
  scaleByFactor: jest.fn(),
  loadRecipe: jest.fn(),
  importRecipe: jest.fn(),
  save: jest.fn(),
  clear: jest.fn(),
  get modified() { return false },
}

const VM_SPY = jest.fn((_: CalcProps) => (vm))
// noinspection JSUnusedGlobalSymbols
jest.mock('./vm', () => ({
  useCalcVM: (props: CalcProps) => VM_SPY(props)
}))
const confirmSpy = jest.fn(() => Promise.resolve());
jest.mock("material-ui-confirm", () => ({
  useConfirm: () => confirmSpy,
}));

let descriptionOnChangeHandler: (description: string) => void

function RecipeDescription(props: RecipeDescriptionProps) {
  descriptionOnChangeHandler = props.updateDescription
  return <span>
    {props.description}
    <TextField
      label="Description"
      value={props.description}
      onChange={(e) => props.updateDescription?.(e.target.value)}
  />
  </span>
}

jest.mock('./RecipeDescription', () => {
  return RecipeDescription
})

import Calc from '@/components/calc/Calc'
import { defaultRecipe } from '@/data/_fixtures'
import {emptyRecipe } from '@/data/recipe'
import {TextField} from "@mui/material";
import React from "react";
import {RecipeDescriptionProps} from "@/components/calc/RecipeDescription";

describe('Calc', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(vm, 'modified', 'get').mockReturnValue(false)
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
    expect(rows[2].getByText('Weight per item')).toBeInTheDocument()
    expect(rows[2].getByText('182')).toBeInTheDocument()
    expect(rows[3].getByText('Flour weight')).toBeInTheDocument()
    expect(rows[3].getByText('120')).toBeInTheDocument()
    expect(rows[4].getByText('Fluid weight')).toBeInTheDocument()
    expect(rows[4].getByText('60')).toBeInTheDocument()
    expect(rows[5].getByText('Salt weight')).toBeInTheDocument()
    expect(rows[5].getByText('2')).toBeInTheDocument()
  })
  it('renders a modified recipe', () => {
    jest.spyOn(vm, 'modified', 'get').mockReturnValue(true)
    render(<Calc initialRecipe={defaultRecipe} onChange={change}/>)
    expect(screen.getByText('Save recipe')).toBeEnabled()
  })
  it('renders an unmodified recipe', () => {
    render(<Calc initialRecipe={defaultRecipe} onChange={change}/>)
    expect(screen.getByText('Save recipe')).not.toBeEnabled()
  })
  it('changes the title and quantity', async () => {
    render(<Calc initialRecipe={defaultRecipe} onChange={change}/>)
    expect(VM_SPY).toHaveBeenCalledWith(
      { initialRecipe: defaultRecipe, onChange: change})
    expect(screen.getByTestId('recipe-name')).toHaveTextContent(defaultRecipe.title)
    await userEvent.click(screen.getByRole('button', { 'name': /edit recipe header/i }))
    const nameInput: HTMLElement = screen.getByLabelText('Name')
    expect(nameInput).toHaveValue(defaultRecipe.title)
    await userEvent.clear(nameInput)
    await userEvent.type(nameInput, 'New recipe name')

    const quantityInput = screen.getByLabelText('Quantity')
    await userEvent.type(quantityInput, '00')

    await userEvent.click(screen.getByRole('button', { 'name': /confirm edit/i }))

    expect(vm.updateTitleAndQuantity).toHaveBeenCalledWith('New recipe name', 100)
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
  describe('import, export, load', () => {
    beforeEach(async () => {
      render(<Calc initialRecipe={defaultRecipe} onChange={change}/>)
      await userEvent.click(screen.getByText('Export, Import, Loading'))
    })

    it('exports the recipe', async () => {

      const exportString = screen.getByTestId('export').textContent ?? ''
      expect(JSON.parse(exportString)).toEqual(defaultRecipe)
    })
    it('loads the recipe', async () => {

      const loadInput = screen.getByTestId('load')

      fireEvent.change(loadInput, {target: {value: 'recipe'} })

      const button = screen.getByRole('button', {
        name: /Load recipe/i
      })
      await userEvent.click(button)

      expect(vm.loadRecipe).toHaveBeenCalledWith('recipe')

    })

    it('imports a recipe', async () => {

      const loadInput = screen.getByTestId('import')

      fireEvent.change(loadInput, {target: {value: 'import recipe'} })

      const button = screen.getByRole('button', {
        name: /Import recipe/i
      })
      await userEvent.click(button)

      expect(vm.importRecipe).toHaveBeenCalledWith('import recipe')
    })
  })
  it('saves a recipe', async () => {
    jest.spyOn(vm, 'modified', 'get').mockReturnValue(true)
    render(<Calc initialRecipe={emptyRecipe} onChange={change}/>)

    const button = screen.getByRole('button', {
      name: /Save recipe/i
    })
    await userEvent.click(button)

    expect(vm.save).toHaveBeenCalled()
  })
  describe('updating quantity', () => {
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
  describe('RecipeDescription', () => {
    beforeEach(() => {
      render(<Calc initialRecipe={defaultRecipe} onChange={jest.fn()} />);
    });

    it('renders the description', () => {
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('calls updateDescription when the confirm edit button is clicked', () => {
      descriptionOnChangeHandler('New Description');
      expect(vm.updateDescription).toHaveBeenCalledWith('New Description');
    });
  });

  describe('start new recipe', () => {
    it('starts a new recipe', async () => {
      jest.spyOn(vm, 'modified', 'get').mockReturnValue(true)
      render(<Calc initialRecipe={defaultRecipe} onChange={change}/>)
      await userEvent.click(screen.getByRole('button', { 'name': /New recipe/i }))
      expect(vm.clear).toHaveBeenCalled()
    })
    it('disabled clear button when recipe is not modified', async () => {
      render(<Calc initialRecipe={defaultRecipe} onChange={change}/>)
      expect(screen.getByRole('button', { 'name': /New recipe/i })).toBeDisabled()
    })
  })
})
