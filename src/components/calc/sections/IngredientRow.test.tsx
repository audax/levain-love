import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Ingredient, IngredientType } from "@/data/recipe";
import IngredientRow from "./IngredientRow";

const exampleIngredient: Ingredient = {
  key: "flour",
  type: IngredientType.flour,
  weight: 100,
  name: "flour ingredient",
};

const commonProps = {
  onChange: jest.fn(),
  onDelete: jest.fn(),
  initialEditMode: false,
  ingredient: exampleIngredient,
};

describe("IngredientRow", () => {
  describe('read only mode', () => {
    it("renders an ingredient read only", () => {
      render(<IngredientRow {...commonProps} />);
      expect(screen.getByText("flour ingredient")).toBeInTheDocument();
      expect(screen.getByText("100g")).toBeInTheDocument();
      expect(screen.getByText("flour")).toBeInTheDocument();
    });
    it("reacts to prop changes", () => {
      const { rerender } = render(<IngredientRow {...commonProps} />);
      expect(screen.getByText("flour ingredient")).toBeInTheDocument();

      rerender(<IngredientRow {...commonProps } ingredient={{...exampleIngredient, name: 'new name'}} />);
      expect(screen.getByText("new name")).toBeInTheDocument();
    });
    it("switches to edit mode", async () => {
      render(<IngredientRow {...commonProps} />);

      const editButton = screen.getByRole("button", { name: /edit ingredient/i });

      await userEvent.click(editButton);

      expect(screen.getByRole("button", { name: /cancel ingredient/i })).toBeInTheDocument();
    });
    it("does not switch to edit mode by prop change", () => {
      const { rerender } = render(<IngredientRow {...commonProps} />);

      rerender(<IngredientRow {...commonProps } initialEditMode={true} />);

      const editButton = screen.queryByRole("button", { name: /edit ingredient/i });
      expect(editButton).toBeInTheDocument();
    })
  })
  describe('edit mode', () => {
    it('renders an ingredient in edit mode', () => {
      render(<IngredientRow {...commonProps} initialEditMode={true} />);
      const editButton = screen.queryByRole("button", { name: /edit ingredient/i });
      expect(editButton).not.toBeInTheDocument();

      const cancelButton = screen.queryByRole("button", { name: /cancel ingredient/i });
      expect(cancelButton).toBeInTheDocument();

      const saveButton = screen.queryByRole("button", { name: /save ingredient/i });
      expect(saveButton).toBeInTheDocument();

    })
  })
});
