import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecipeDescription from './RecipeDescription';

describe('RecipeDescription', () => {
  const mockUpdate = jest.fn();

  describe('with a rendered component', () => {

      beforeEach(() => {
          render(<RecipeDescription description="Test Description" updateDescription={mockUpdate} />);
      });

      it('renders the description', () => {
          expect(screen.getByText('Test Description')).toBeInTheDocument();
      });

      it('enters edit mode when the edit button is clicked', () => {
          fireEvent.click(screen.getByLabelText('edit description'));
          expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
      });

      it('calls updateDescription when the confirm edit button is clicked', () => {
          fireEvent.click(screen.getByLabelText('edit description'));
          fireEvent.change(screen.getByDisplayValue('Test Description'), {target: {value: 'New Description'}});
          fireEvent.click(screen.getByLabelText('confirm edit'));
          expect(mockUpdate).toHaveBeenCalledWith('New Description');
      });

      it('cancels edit when the cancel edit button is clicked', () => {
          fireEvent.click(screen.getByLabelText('edit description'));
          fireEvent.change(screen.getByDisplayValue('Test Description'), {target: {value: 'New Description'}});
          fireEvent.click(screen.getByLabelText('cancel edit'));
          expect(screen.getByText('Test Description')).toBeInTheDocument();
      });
  });
});
