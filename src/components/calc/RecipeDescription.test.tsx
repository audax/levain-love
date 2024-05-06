import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import React from "react";
import {MDXEditorProps} from "@mdxeditor/editor";
import {TextField} from "@mui/material";

function Editor(props: MDXEditorProps & { originalText: string }) {
    return <TextField
        label="Description"
        value={props.markdown}
        onChange={(e) => props.onChange?.(e.target.value)}
    />
}

jest.mock('./Editor', () => {
    // noinspection JSUnusedGlobalSymbols
    return { Editor }
})

jest.mock('react-markdown', () => {
    return {
        __esModule: true,
        default: function Markdown(props: { children: string }) {
            return <div>{props.children}</div>
        }
    }
})

jest.mock('remark-gfm', () => {
    return {
        __esModule: true,
        default: () => {}
    }
})

import RecipeDescription from "@/components/calc/RecipeDescription";

describe('RecipeDescription', () => {
  const mockUpdate = jest.fn();

  describe('with a rendered component', () => {

      beforeEach(() => {
          render(<RecipeDescription description="Test Description" updateDescription={mockUpdate} />);
      });

      it('renders the description', () => {
          expect(screen.getByText('Test Description')).toBeInTheDocument();
      });

      it('enters edit mode when the edit button is clicked', async () => {
          await userEvent.click(screen.getByLabelText('edit description'));

          expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
      });

      it('calls updateDescription when the confirm edit button is clicked', async () => {
          await userEvent.click(screen.getByLabelText('edit description'));
          const input = screen.getByLabelText('Description');
          await userEvent.clear(input);
          await userEvent.type(input, 'New Description');
          await userEvent.click(screen.getByLabelText('confirm edit'));
          expect(mockUpdate).toHaveBeenCalledWith('New Description');
      });

      it('cancels edit when the cancel edit button is clicked', async () => {
          await userEvent.click(screen.getByLabelText('edit description'));
          const input = screen.getByLabelText('Description');
          await userEvent.clear(input);
          await userEvent.type(input, 'New Description');
          await userEvent.click(screen.getByLabelText('cancel edit'));
          expect(screen.getByText('Test Description')).toBeInTheDocument();
      });
  });
});
