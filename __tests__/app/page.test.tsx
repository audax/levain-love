import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '@/layouts/Home/Home'
 
describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)
 
    const heading = screen.getByRole('heading', {
      name: /levain love/i,
    })
 
    expect(heading).toBeInTheDocument()
  })
})