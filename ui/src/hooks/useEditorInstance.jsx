import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import useStore from '~/features/store';

export function useEditorQuestion(id, updateEditorContent = () => {}) {
    const { registerEditor } = useStore();
    const editor = useEditor(
        {
            editable: true,
            extensions: [StarterKit, TextAlign],
            content: '',
            editorProps: {
                attributes: {
                    id: id,
                },
            },
            onCreate: ({ editor }) => {
                console.log('REGISTER');

                registerEditor(id, editor);
                editor.commands.setTextAlign('center');
            },
            onSelectionUpdate: ({ editor }) => {
                if (editor.isEmpty) {
                    editor.commands.setTextAlign('center');
                }
            },
            onUpdate: ({ editor }) => {
                updateEditorContent(id, editor.getHTML());
                // Có thể truyền thêm hàm update ở đây nếu cần
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
