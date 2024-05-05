import {render, screen} from "@testing-library/react";
import { exampleSection } from "./_fixtures";
import SectionHeader from "@/components/calc/sections/SectionHeader";
import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import {SectionType} from "@/data/recipe";

const onUpdate = jest.fn()
const remove= jest.fn()

describe('SectionHeader', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    describe('in read mode', () => {
        beforeEach(() => {
            render(<SectionHeader section={exampleSection} onUpdate={onUpdate}
                                  remove={remove} initialEditMode={false}/>)
        })
        it('renders a section header', () => {
            expect(screen.getByText(exampleSection.name)).toBeInTheDocument()
            expect(screen.getByText('dough')).toBeInTheDocument()
        })
        it('calls remove', async () => {
            await userEvent.click(screen.getByRole('button', { name: /remove section/i }))
            expect(remove).toHaveBeenCalled()
        })

        it('switches to edit mode and back', async () => {
            await userEvent.click(screen.getByRole('button', { name: /edit section/i }))
            await userEvent.click(screen.getByRole('button', { name: /cancel edit/i }))
            expect(screen.queryByRole('button', { name: /cancel edit/i})).toBeNull()
        })
    })
    describe('in edit mode', () => {
        beforeEach(() => {
            render(<SectionHeader section={exampleSection} onUpdate={onUpdate}
                                  remove={remove} initialEditMode={true}/>)
        })
        it('starts in edit mode', async () => {
            const cancelButton = screen.getByRole('button', { name: /cancel edit/i })
            expect(cancelButton).toBeInTheDocument()
        })
        it('calls onUpdate and reverts to read mode', async () => {
            await userEvent.clear(screen.getByLabelText('Name'))
            await userEvent.type(screen.getByLabelText('Name'), 'new name')
            await userEvent.click(screen.getByLabelText('Type'))
            await userEvent.click(screen.getByText(SectionType.preferment))
            await userEvent.click(screen.getByRole('button', { name: /confirm edit/i }))
            expect(screen.queryByRole('button', { name: /cancel edit/i})).toBeNull()
            expect(onUpdate).toHaveBeenCalledWith('new name', SectionType.preferment)

            expect(screen.getByText('new name')).toBeInTheDocument()
            expect(screen.getByText(SectionType.preferment)).toBeInTheDocument()
        })
        it('cancels edit and reverts to read mode', async () => {
            expect(screen.getByDisplayValue(exampleSection.name)).toBeInTheDocument()
            expect(screen.getByDisplayValue('dough')).toBeInTheDocument()

            await userEvent.clear(screen.getByLabelText('Name'))
            await userEvent.type(screen.getByLabelText('Name'), 'new name')
            await userEvent.click(screen.getByLabelText('Type'))
            await userEvent.click(screen.getByText(SectionType.preferment))
            expect(screen.getByLabelText('Name')).toHaveValue('new name')

            await userEvent.click(screen.getByRole('button', { name: /cancel edit/i }))


            expect(screen.queryByRole('button', { name: /cancel edit/i})).toBeNull()
            expect(onUpdate).not.toHaveBeenCalled()
            expect(screen.getByText(exampleSection.name)).toBeInTheDocument()
            expect(screen.getByText(exampleSection.type)).toBeInTheDocument()

            await userEvent.click(screen.getByRole('button', { name: /edit section/i }))

            expect(screen.getByLabelText('Name')).toHaveValue(exampleSection.name)
        })

    })
})
