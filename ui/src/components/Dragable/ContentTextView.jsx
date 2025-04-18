import classNames from 'classnames/bind';
import styles from './ContentTextView.module.scss';
import './customStyle.css';
import React from 'react';
import { TYPE_TABLE } from '~/utils/Const';
import useStore from '~/features/store';

const cx = classNames.bind(styles);

function ContentTextView({ editor, element }) {
    // const { selectedElements } = useStore();
    if (!editor) return null;
    const isTable = element.type === TYPE_TABLE;
    const containerClassName = isTable
        ? cx('table-tiptap')
        : cx(
              'content-text',
              { type: element.type === 'h1' || element.type === 'body' },
              { [element.tab]: element.tab },
          );

    const containerStyle = isTable
        ? undefined
        : {
              position: 'absolute',
              zIndex: 30,
              width: 'calc(100% - 16px)',
              wordWrap: 'break-word',
          };

    return (
        <div
            style={containerStyle}
            className={containerClassName}
            dangerouslySetInnerHTML={{
                __html: editor.getHTML(),
            }}
        />
    );
}

export default ContentTextView;
