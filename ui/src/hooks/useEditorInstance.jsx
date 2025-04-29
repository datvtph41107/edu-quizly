import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import useStore from '~/features/store';

export function useEditorQuestion(query = null, updateEditorContent = () => {}) {
    console.log(query);

    const { registerEditor } = useStore();
    const editor = useEditor(
        {
            editable: true,
            extensions: [StarterKit, TextAlign],
            content: query?.text || '',
            editorProps: {
                attributes: {
                    id: query.id,
                },
            },
            onCreate: ({ editor }) => {
                console.log('REGISTER');
                registerEditor(query.id, editor);
                editor.commands.setTextAlign('center');
            },
            onSelectionUpdate: ({ editor }) => {
                if (editor.isEmpty) {
                    editor.commands.setTextAlign('center');
                }
            },
            onUpdate: ({ editor }) => {
                updateEditorContent(query.id, editor.getHTML(), editor.isEmpty);
            },
            onFocus: () => {
                // setActive(true);
            },
            onBlur: () => {
                // setActive(false);
            },
        },
        [],
    );

    return editor;
}
