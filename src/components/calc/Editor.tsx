'use client'
// ForwardRefEditor.tsx

// This is the only place InitializedMDXEditor is imported directly.
import {forwardRef} from "react";
import {MDXEditorMethods, MDXEditorProps} from "@mdxeditor/editor";
import dynamic from "next/dynamic";

const InitializedMDXEditor = dynamic(() => import('./InitializedMDXEditor'), {
    // Make sure we turn SSR off
    ssr: false
})

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.
export const Editor = forwardRef<MDXEditorMethods, MDXEditorProps & { originalText: string} >((props, ref) =>
    <InitializedMDXEditor {...props} editorRef={ref} />)


Editor.displayName = 'Editor'
