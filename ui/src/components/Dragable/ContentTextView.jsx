import classNames from 'classnames/bind';
import styles from './ContentText.module.scss';
import { EditorContent } from '@tiptap/react';
import './customStyle.css';
import { TYPE_SHAPE, TYPE_TEXT } from '~/utils/Const';
import React from 'react';

const cx = classNames.bind(styles);
const ContentTextView = function ContentText({
    height,
    isSelected,
    setIsEditing,
    editor,
    onSelect,
    element,
    changeEditorType,
    selectedElements,
}) {
    if (!editor) return null;

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
                if (editor.getHTML() === `<p>${element.placeholder}</p>`) {
                    editor.commands.setContent('');
                }
                setIsEditing(true);
            }}
        >
            <div
                className={`content-${element?.tab === TYPE_SHAPE ? TYPE_SHAPE : TYPE_TEXT}`}
                dangerouslySetInnerHTML={{
                    __html: editor.getHTML(),
                }}
            />
        </div>
    );
};

export default ContentTextView;
