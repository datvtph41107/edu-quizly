import classNames from 'classnames/bind';
import styles from './ContentText.module.scss';
import { EditorContent } from '@tiptap/react';
import './customStyle.css';
import { TYPE_SHAPE, TYPE_TEXT } from '~/utils/Const';
import React, { useState } from 'react';

const cx = classNames.bind(styles);
function ContentText({ isSelected, editor, element }) {
    if (!editor) return null;
    const [count, setCount] = useState(0);

    const editorClass = classNames(`content-${element?.tab === TYPE_SHAPE ? TYPE_SHAPE : TYPE_TEXT}`, 'tiptap', {
        [`contentShape ProseMirror${editor.isFocused || count === 0 ? ' ProseMirror-focus' : ''}`]: true,
        'hide-placeholder': count === 1,
    });

    return (
        <div
            id={'contentText' + (isSelected ? '-selected' : '')}
            className={cx(
                'content-text',
                { type: element.type === 'h1' || element.type === 'body' },
                { active: !isSelected },
                { [element.tab]: element.tab },
            )}
            onClick={() => {
                if (editor.isEmpty) {
                    editor.commands.setContent('');
                    setCount(1);
                }
            }}
        >
            <div className={editorClass}>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

export default ContentText;
