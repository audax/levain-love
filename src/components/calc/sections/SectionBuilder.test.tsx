import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import {IngredientType, SectionType} from "@/data/recipe";
import { SectionBuilderProps, SectionBuilderVM } from "./types";

const enrichedExample = enrichSection(exampleSection)

const vm: SectionBuilderVM = {
  section: enrichedExample,
  updateHeader: jest.fn(),
  updateIngredient: jest.fn(),
  removeIngredient: jest.fn(),
  addIngredient: jest.fn(),
  scaleByFactor: jest.fn(),
  remove: jest.fn()
};

const props: SectionBuilderProps = {
  initialSection: exampleSection,
  onChange: jest.fn(),
  onScale: jest.fn(),
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
    }

    const save = async () => {
      const saveButton = screen.getByRole("button", {
        name: /save ingredient/i,
      });
      fireEvent.click(saveButton);
    }
    it("updates an ingredient name", async () => {
      const spy = jest.spyOn(vm, "updateIngredient");
      render(<SectionBuilder {...props} initialSection={emptySection} />);

      await update(0, "Name", "new name");
      await save()

      expect(spy).toHaveBeenCalledWith({ ...enrichedExample.ingredients[0], name: "new name" });
    });

    it("updates an ingredient weight", async () => {
      const spy = jest.spyOn(vm, "updateIngredient");
      render(<SectionBuilder {...props} />);

      await update(0, "Weight", "1001");
      await save()

      expect(spy).toHaveBeenCalledWith({ ...enrichedExample.ingredients[0], weight: 1001 });
    });
    it('calls onScale with the correct factor when scale button is clicked', async () => {
      render(<SectionBuilder {...props} />);

      await update(0, "Weight", "200");
      const scaleButtons = screen.getAllByRole("button", { name: /scale recipe/i });
      await userEvent.click(scaleButtons[0]);

      expect(vm.scaleByFactor).toHaveBeenCalledWith(2); // assuming the scale factor is 2
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
    it("updates the section name and type", async () => {
        render(<SectionBuilder {...props} />);
        await userEvent.click(screen.getByLabelText(/edit section header/i));

        const nameField = screen.getByLabelText("Name");
        await userEvent.clear(nameField);
        await userEvent.type(nameField, "new name");

        const typeField = screen.getByLabelText("Type");
        fireEvent.mouseDown(typeField);
        const listbox = within(screen.getByRole("listbox"));
        await userEvent.click(listbox.getByText(/preferment/i));

        const saveButton = screen.getByRole("button", {
            name: /confirm edit/i,
        });
        fireEvent.click(saveButton);

        expect(vm.updateHeader).toHaveBeenCalledWith("new name", SectionType.preferment);
    });
  });
});
