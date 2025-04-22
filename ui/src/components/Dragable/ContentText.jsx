import classNames from 'classnames/bind';
import styles from './ContentText.module.scss';
import { EditorContent } from '@tiptap/react';
import './customStyle.css';
import { TYPE_TABLE, TYPE_TEXT_TAG, TYPE_TEXT_TAG_BODY } from '~/utils/Const';
import React, { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function ContentText({ editor, element, onResizeContent }) {
    if (!editor) return null;
    const [hasFocusedOnce, setHasFocusedOnce] = useState(false);
    const ref = useRef(null);

    const isTable = element.type === TYPE_TABLE;
    const isTextTag = element.type === TYPE_TEXT_TAG || element.type === TYPE_TEXT_TAG_BODY;

    useEffect(() => {
        if (!ref.current || !onResizeContent) return;

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                const { width, height } = entry.contentRect;
                // console.log('NEW WIDTH:', width);

                onResizeContent({ width, height });
            }
        });

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [ref.current]);

    const isContentEmpty = (editor) => {
        if (editor.isEmpty) return false;

        const html = editor.getHTML();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        const text = tempDiv.textContent?.replace(/\u200B/g, '').trim();

        return !text;
    };

    useEffect(() => {
        if (!editor) return;

        const handleFocus = () => {
            if (!hasFocusedOnce) {
                setHasFocusedOnce(true);
            }
        };

        const handleBlur = () => {
            if (isTextTag && isContentEmpty(editor)) {
                setHasFocusedOnce(false);
            }
        };

        editor.on('focus', handleFocus);
        editor.on('blur', handleBlur);

        return () => {
            editor.off('focus', handleFocus);
            editor.off('blur', handleBlur);
        };
    }, [editor, hasFocusedOnce, isTextTag]);

    const showPlaceholder = !hasFocusedOnce;

    const containerClassName = !isTable
        ? cx('content-text', {
              type: isTextTag,
              [element.tab]: element.tab,
              'opacity-zero': isTextTag && !editor.isFocused,
          })
        : undefined;

    return (
        <div ref={ref} className={containerClassName}>
            {showPlaceholder && (
                <div className={cx('placeholder', { [element.tab]: [element.tab] })}>{element.placeholder}</div>
            )}
            <EditorContent editor={editor} />
        </div>
    );
}

export default ContentText;
