import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import useStore from '~/features/store';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';

export function useEditorQuestion(query = null, updateEditorContent = () => {}) {
    const { registerEditor } = useStore();

    const editor = useEditor(
        {
            editable: true,
            extensions: [StarterKit, TextAlign, TextStyle, Color],
            content: query?.text || '',
            editorProps: {
                attributes: {
                    id: query.id,
                },
            },
            onCreate: ({ editor }) => {
                registerEditor(query.id, editor);
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
