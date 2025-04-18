import classNames from 'classnames/bind';
import styles from './ContentText.module.scss';
import { EditorContent } from '@tiptap/react';
import './customStyle.css';
import { TYPE_SHAPE, TYPE_TABLE, TYPE_TEXT } from '~/utils/Const';
import React, { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function ContentText({ editor, element }) {
    if (!editor) return null;
    const [hasFocusedOnce, setHasFocusedOnce] = useState(false);
    const isTable = element.type === TYPE_TABLE;

    useEffect(() => {
        if (editor.isFocused && !hasFocusedOnce) {
            setHasFocusedOnce(true);
        }
    }, [editor.isFocused, hasFocusedOnce]);

    const editorClass = !isTable
        ? classNames(`content-${element?.tab === TYPE_SHAPE ? TYPE_SHAPE : TYPE_TEXT}`, 'tiptap', {
              [`contentShape ProseMirror${editor.isFocused ? ' ProseMirror-focus' : ''}`]: true,
          })
        : classNames(cx('table-tiptap', { 'table-focused': editor.isFocused }));

    const containerClassName = !isTable
        ? cx('content-text', { type: element.type === 'h1' || element.type === 'body' }, { [element.tab]: element.tab })
        : undefined;

    return (
        <div className={containerClassName}>
            <div
                style={{ display: hasFocusedOnce ? 'none' : 'block' }}
                className={cx('placeholder', { [element.tab]: [element.tab] })}
            >
                {element.placeholder}
            </div>
            <div className={editorClass}>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

export default ContentText;
