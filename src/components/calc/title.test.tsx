import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { Recipe, emptyRecipe } from '@/data/recipe'
import Title from './Title'

const defaultRecipe: Recipe = {
  ...emptyRecipe,
  title: 'Test Recipe',
}
 
describe('Calc', () => {
  it('renders a title', () => {
    render(<Title title="Test Recipe" onChange={() => {}}/>)
    expect(screen.getByLabelText(/Recipe name/i)).toHaveValue('Test Recipe')
  })
  it('changes the title', async () => {
    const change = jest.fn()
    render(<Title title="Init" onChange={change}/>)
    const input = screen.getByLabelText('Recipe name')
    await userEvent.clear(input)
    change.mockClear()
    await userEvent.type(input, '+')

    await waitFor(() => expect(change).toHaveBeenCalledWith( 'Init+'))

  })
})