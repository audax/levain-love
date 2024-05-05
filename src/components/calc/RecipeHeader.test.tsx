import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecipeHeader from './RecipeHeader';

describe('RecipeHeader', () => {
  const mockUpdate = jest.fn();
  const mockScale = jest.fn();

  describe('with a rendered component', () => {

      beforeEach(() => {
          render(<RecipeHeader title="Test Recipe" quantity={2} onUpdate={mockUpdate} scaleQuantity={mockScale} initialEditMode={false}/>);
      });

      it('renders the title and quantity', () => {
          expect(screen.getByTestId('recipe-name')).toHaveTextContent('Test Recipe');
          expect(screen.getByTestId('recipe-quantity')).toHaveTextContent('2');
      });

      it('enters edit mode when the edit button is clicked', () => {
          fireEvent.click(screen.getByLabelText('edit recipe header'));
          expect(screen.getByLabelText('Name')).toHaveValue('Test Recipe');
          expect(screen.getByLabelText('Quantity')).toHaveValue(2);
      });

      it('calls onUpdate when the confirm edit button is clicked', () => {
          fireEvent.click(screen.getByLabelText('edit recipe header'));
          fireEvent.change(screen.getByLabelText('Name'), {target: {value: 'New Recipe'}});
          fireEvent.change(screen.getByLabelText('Quantity'), {target: {value: '3'}});
          fireEvent.click(screen.getByLabelText('confirm edit'));
          expect(mockUpdate).toHaveBeenCalledWith('New Recipe', 3);
      });

      it('calls scaleQuantity when the scale recipe button is clicked', () => {
          fireEvent.click(screen.getByLabelText('edit recipe header'));
          fireEvent.change(screen.getByLabelText('Quantity'), {target: {value: '3'}});
          fireEvent.click(screen.getByLabelText('scale recipe'));
          expect(mockScale).toHaveBeenCalledWith(3);
      });
  });

  it('updates the title and quantity when rerendered with new props', () => {
  const { rerender } = render(<RecipeHeader title="Test Recipe" quantity={2} onUpdate={mockUpdate} scaleQuantity={mockScale} initialEditMode={false} />);

  // Check initial render
  expect(screen.getByTestId('recipe-name')).toHaveTextContent('Test Recipe');
  expect(screen.getByTestId('recipe-quantity')).toHaveTextContent('2');

  // Rerender with new props
  rerender(<RecipeHeader title="Updated Recipe" quantity={5} onUpdate={mockUpdate} scaleQuantity={mockScale} initialEditMode={false} />);

  // Check updated render
  expect(screen.getByTestId('recipe-name')).toHaveTextContent('Updated Recipe');
  expect(screen.getByTestId('recipe-quantity')).toHaveTextContent('5');
});
});
