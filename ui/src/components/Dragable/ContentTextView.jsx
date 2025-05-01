import classNames from 'classnames/bind';
import styles from './ContentTextView.module.scss';
import React, { useState } from 'react';
import { TYPE_SHAPE, TYPE_TABLE, TYPE_TEXT_TAG, TYPE_TEXT_TAG_BODY } from '~/utils/Const';
import './customStyle.css';
import { isContentEmpty } from '~/utils/Utils';

const cx = classNames.bind(styles);

function ContentTextView({ editor, element, scale = 1, isPreview = false }) {
    if (!editor) return null;

    const [hasFocusedOnce, _] = useState(false);
    const isTable = element.type === TYPE_TABLE;
    const isTextTag = element.type === TYPE_TEXT_TAG || element.type === TYPE_TEXT_TAG_BODY;

    const isEmpty = isContentEmpty(editor);

    const containerClassName = isTable
        ? cx('table-tiptap')
        : cx('content-text', { type: isTextTag }, { [element.tab]: element.tab });

    const containerStyle = isTable
        ? isPreview
            ? {
                  position: 'absolute',
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                  width: `${element.transform.size.width}px`,
                  height: `${element.transform.size.height}px`,
              }
            : undefined
        : {
              position: 'absolute',
              zIndex: 30,
              wordWrap: 'break-word',
              ...(isPreview && element.tab == TYPE_SHAPE
                  ? {
                        transform: `scale(${scale})`,
                        width: `${element.transform.size.width}px`,
                        margin: `${12 * scale}px`,
                    }
                  : {
                        width: 'calc(100% - 16px)',
                    }),
          };

    const showPlaceholder = !hasFocusedOnce;

    const content =
        showPlaceholder && isTextTag && isEmpty && element.placeholder ? (
            <div style={containerStyle} className={containerClassName}>
                <div className={cx('placeholder', { [element.tab]: [element.tab] })}>{element.placeholder}</div>
            </div>
        ) : (
            <div
                style={containerStyle}
                className={containerClassName}
                dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
            />
        );

    return isPreview && element.tab !== TYPE_SHAPE && element.type !== TYPE_TABLE ? (
        <div
            style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                width: `${100 / scale}%`,
            }}
        >
            {content}
        </div>
    ) : (
        <>{content}</>
    );
}

export default ContentTextView;
