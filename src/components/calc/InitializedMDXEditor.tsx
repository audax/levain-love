'use client'
// InitializedMDXEditor.tsx
import '@mdxeditor/editor/style.css'
import type {ForwardedRef} from 'react'
import {
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    type MDXEditorMethods,
    type MDXEditorProps,
    tablePlugin,
    toolbarPlugin,
    InsertTable,
    UndoRedo,
    BoldItalicUnderlineToggles,
    diffSourcePlugin,
    DiffSourceToggleWrapper,
    CreateLink,
    ListsToggle,
    BlockTypeSelect
} from '@mdxeditor/editor'

// Only import this to the next file
export default function InitializedMDXEditor({
                                                 editorRef,
                                                originalText,
                                                 ...props
                                             }: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps & { originalText: string }) {
    return (
        <MDXEditor
            placeholder="Enter your recipe description here"
            plugins={[
                diffSourcePlugin({ diffMarkdown: originalText, viewMode: 'rich-text' }),
                headingsPlugin(),
                tablePlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                toolbarPlugin({
                    toolbarContents: () =>
                        <DiffSourceToggleWrapper>
                            <UndoRedo />
                            <BoldItalicUnderlineToggles/>
                            <ListsToggle />
                            <BlockTypeSelect />
                            <InsertTable />
                            <CreateLink />
                        </DiffSourceToggleWrapper>
                }),
            ]}
            {...props}
            ref={editorRef}
        />
    )
}
