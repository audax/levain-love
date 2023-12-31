import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { IngredientType } from "@/data/recipe";
import { SectionBuilderProps, SectionBuilderVM } from "./types";

const enrichedExample = enrichSection(exampleSection)

const vm: SectionBuilderVM = {
  section: enrichedExample,
  setName: jest.fn(),
  setType: jest.fn(),
  updateIngredient: jest.fn(),
  removeIngredient: jest.fn(),
  addIngredient: jest.fn(),
  commitEdit: jest.fn(),
  type: enrichedExample.type,
  name: enrichedExample.name,
  cancelEdit: function (): void {
    throw new Error("Function not implemented.");
  },
  editMode: false,
  startEdit: function (): void {
    throw new Error("Function not implemented.");
  },
  remove: jest.fn()
};

const props: SectionBuilderProps = {
  initialSection: exampleSection,
  onChange: jest.fn(),
  remove: jest.fn(),
};

const VM_SPY = jest.fn((_: SectionBuilderProps) => vm);
jest.mock("./vm", () => ({
  useSectionBuilderVm: (props: SectionBuilderProps) => VM_SPY(props),
}));

import SectionBuilder from "./SectionBuilder";
import {emptySection, exampleSection} from "./_fixtures";
import { enrichSection } from "@/data/calculate";

describe("SectionBuilder", () => {
  it("renders a section", () => {
    render(<SectionBuilder {...props} />);
    expect(screen.getByText("dough")).toBeInTheDocument();
    expect(screen.getAllByText("flour-ingredient").length).toBeGreaterThan(0);
    expect(screen.getAllByText("water-ingredient").length).toBeGreaterThan(0);
    expect(screen.getAllByText("salt-ingredient").length).toBeGreaterThan(0);
  });

  it("removes a section", async () => {
    render(<SectionBuilder {...props} />);
    const remove = screen.getByRole("button", { name: 'remove section' });
    await userEvent.click(remove)

    expect(vm.remove).toHaveBeenCalled()
  })

  describe('adding ingredients', ()=>{
    Object.values(IngredientType).forEach((value) => {
      it(`adds ${value} ingredient`, async () => {
        render(<SectionBuilder {...props} />);
        const button = screen.getByRole("button", { name: value });
        await userEvent.click(button);

        expect(vm.addIngredient).toHaveBeenCalledWith(value);
      });
    })

  })

  it("removes an ingredient", async () => {
    render(<SectionBuilder {...props} />);
    const deleteButtons = screen.getAllByRole("button", {
      name: /remove ingredient/i,
    });
    await userEvent.click(deleteButtons[0]);

    expect(vm.removeIngredient).toHaveBeenCalledWith(enrichedExample.ingredients[0]);

    jest.mocked(vm.removeIngredient).mockClear();

    await userEvent.click(deleteButtons[1]);
    expect(vm.removeIngredient).toHaveBeenCalledWith(enrichedExample.ingredients[1]);
  });

  describe("updates", () => {
    const update = async (ingredientIndex: number, label: string, value: string) => {
      const editButtons = screen.getAllByRole("button", {
        name: /edit ingredient/i,
      });
      await userEvent.click(editButtons[ingredientIndex]);
      const ingredientName = screen.getAllByLabelText(label);
      await userEvent.clear(ingredientName[ingredientIndex]);
      await userEvent.type(ingredientName[ingredientIndex], value);

      const saveButton = screen.getByRole("button", {
        name: /save ingredient/i,
      });
      fireEvent.click(saveButton);
    }

    it("updates an ingredient name", async () => {
      const spy = jest.spyOn(vm, "updateIngredient");
      render(<SectionBuilder {...props} initialSection={emptySection} />);

      await update(0, "Name", "new name");

      expect(spy).toHaveBeenCalledWith({ ...enrichedExample.ingredients[0], name: "new name" });
    });

    it("updates an ingredient weight", async () => {
      const spy = jest.spyOn(vm, "updateIngredient");
      render(<SectionBuilder {...props} />);

      await update(0, "Weight", "1001");

      expect(spy).toHaveBeenCalledWith({ ...enrichedExample.ingredients[0], weight: 1001 });
    });
    it("updates an ingredient type", async () => {
      const spy = jest.spyOn(vm, "updateIngredient");
      render(<SectionBuilder {...props} />);

      const editButtons = screen.getAllByRole("button", {
        name: /edit ingredient/i,
      });
      await userEvent.click(editButtons[0]);
      const ingredientName = screen.getAllByLabelText("Type");
      fireEvent.mouseDown(ingredientName[0]);
      const listbox = within(screen.getByRole("listbox"));

      await userEvent.click(listbox.getByText(/fluid/i));

      const saveButton = screen.getByRole("button", {
        name: /save ingredient/i,
      });
      fireEvent.click(saveButton);

      expect(spy).toHaveBeenCalledWith({ ...enrichedExample.ingredients[0], weight: 1001 });
    });
  });
});
