import classNames from 'classnames/bind';
import styles from './ContentText.module.scss';
import { EditorContent } from '@tiptap/react';
import './customStyle.css';

const cx = classNames.bind(styles);

function ContentText({
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
                <div className={`content-${element?.tab === 'shape' ? 'shape' : 'text'}`}>
                    <EditorContent
                        // style={{
                        //     fontSize:
                        //         selectedElements?.element?.id === element.id &&
                        //         changeEditorType.fontSize.active &&
                        //         changeEditorType.fontSize.value + 'px',
                        // }}
                        editor={editor}
                    />
                </div>
            </div>
        </div>
    );
}

export default ContentText;
