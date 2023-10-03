import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { EnrichedIngredient, IngredientType } from "@/data/recipe";
import IngredientRow  from "./IngredientRow";
import {ReactNode} from "react";

const exampleIngredient: EnrichedIngredient = {
  key: "flour",
  type: IngredientType.flour,
  weight: 100,
  name: "flour ingredient",
  pct: 99,
};

const commonProps = {
  onChange: jest.fn(),
  onDelete: jest.fn(),
  initialEditMode: false,
  ingredient: exampleIngredient,
};

describe("IngredientRow", () => {

  const inTable = (element: ReactNode) => {
    return <table>
        <tbody>
          {element}
        </tbody>
      </table>
  }

  describe('read only mode', () => {
    it("renders an ingredient read only", () => {
      render(inTable(<IngredientRow {...commonProps} />));
      expect(screen.getByText("flour ingredient")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("flour")).toBeInTheDocument();
      expect(screen.getByText("99.00")).toBeInTheDocument();
    });
    it("reacts to prop changes", () => {
      const { rerender } = render(inTable(<IngredientRow {...commonProps} />));
      expect(screen.getByText("flour ingredient")).toBeInTheDocument();

      rerender(inTable(<IngredientRow {...commonProps } ingredient={{...exampleIngredient, name: 'new name'}} />));
      expect(screen.getByText("new name")).toBeInTheDocument();
    });
    it("switches to edit mode", async () => {
      render(inTable(<IngredientRow {...commonProps} />));

      const editButton = screen.getByRole("button", { name: /edit ingredient/i });

      await userEvent.click(editButton);

      expect(screen.getByRole("button", { name: /cancel ingredient/i })).toBeInTheDocument();
    });
    it("does not switch to edit mode by prop change", () => {
      const { rerender } = render(inTable(<IngredientRow {...commonProps} />));

      rerender(inTable(<IngredientRow {...commonProps } initialEditMode={true} />));

      const editButton = screen.queryByRole("button", { name: /edit ingredient/i });
      expect(editButton).toBeInTheDocument();
    })
  })
  describe('edit mode', () => {
    it('renders an ingredient in edit mode', () => {
      render(inTable(<IngredientRow {...commonProps} initialEditMode={true} />));
      const editButton = screen.queryByRole("button", { name: /edit ingredient/i });
      expect(editButton).not.toBeInTheDocument();

      const cancelButton = screen.queryByRole("button", { name: /cancel ingredient/i });
      expect(cancelButton).toBeInTheDocument();

      const saveButton = screen.queryByRole("button", { name: /save ingredient/i });
      expect(saveButton).toBeInTheDocument();

    })

    it('edits multiple fields at once', async () => {
      render(inTable(<IngredientRow {...commonProps} initialEditMode={true} />));

      const nameField = screen.getByLabelText('Name');
      await userEvent.clear(nameField);
      await userEvent.type(nameField, 'new name');

      const weightField = screen.getByLabelText('Weight');
      await userEvent.clear(weightField);
      await userEvent.type(weightField, '210');


      const saveButton = screen.getByRole("button", { name: /save ingredient/i });
      await userEvent.click(saveButton);

      expect(commonProps.onChange).toHaveBeenCalledWith({
        ...exampleIngredient, name: 'new name', weight: 210
      })

    })
  })
});
