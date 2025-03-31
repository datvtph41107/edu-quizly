import classNames from 'classnames/bind';
import styles from './ContentText.module.scss';
import { EditorContent } from '@tiptap/react';

const cx = classNames.bind(styles);

function ContentText({
    height,
    isSelected,
    setIsEditing,
    editor,
    isEditing,
    contentRef,
    valueLength,
    onSelect,
    element,
}) {
    // if (!editor) return null;
    // console.log(editor);

    return (
        <div
            id={'contentText' + (isSelected ? '-selected' : '')}
            ref={contentRef}
            style={{ width: element.width, height: height }}
            className={cx('content-text', { [element.tab]: element.tab })}
            onClick={() => {
                if (editor.getHTML() === `<p>${element.textPreview}</p>`) {
                    editor.commands.setContent('');
                }
                setIsEditing(true);
            }}
        >
            <div className={cx('content-text-ce')}>
                <EditorContent editor={editor} />
            </div>
            {/* {isEditing || valueLength.length >= 1 ? (
                <div className={cx('content-text-ce')}>
                    <EditorContent editor={editor.editor} />
                </div>
            ) : element.tab === 'shape' ? (
                <div className={cx('content-text-type')}>
                    <p>
                        <span style={{ fontSize: '14px' }}>Type...</span>
                    </p>
                </div>
            ) : (
                <div className={cx('content-text-type', { [element.tab]: element.tab })}>
                    <p style={{ width: element.width }}>Enter Text...</p>
                </div>
            )} */}
        </div>
    );
}

export default ContentText;
