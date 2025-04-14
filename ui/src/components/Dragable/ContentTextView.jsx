import classNames from 'classnames/bind';
import styles from './ContentText.module.scss';
import './customStyle.css';
import React from 'react';

const cx = classNames.bind(styles);
function ContentTextView({ isSelected, editor, element }) {
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
            }}
        >
            <div
                dangerouslySetInnerHTML={{
                    __html: element.data.html,
                }}
            />
        </div>
    );
}

export default ContentTextView;
