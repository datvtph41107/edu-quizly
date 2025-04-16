import classNames from 'classnames/bind';
import styles from './ContentTextView.module.scss';
import './customStyle.css';
import React from 'react';
import { Utils } from '~/utils/Utils';

const cx = classNames.bind(styles);
function ContentTextView({ isSelected, editor, element }) {
    if (!editor) return null;

    return (
        <div
            style={{
                position: 'absolute',
                zIndex: 30,
                width: 'calc(100% - 16px)',
                wordWrap: 'break-word',
            }}
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
            dangerouslySetInnerHTML={{
                __html: editor.getHTML(),
            }}
        />
    );
}

export default ContentTextView;
