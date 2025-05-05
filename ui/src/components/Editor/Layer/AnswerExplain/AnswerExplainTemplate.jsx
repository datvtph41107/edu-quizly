import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AnswerExplainTemplate.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEditorQuestion } from '~/hooks/useEditorInstance';
import useStore from '~/features/store';
import { EditorContent } from '@tiptap/react';

const cx = classNames.bind(styles);

function AnswerExplainTemplate({ onClose }) {
    const { getSelectedPreviewItem, updateExplainText } = useStore();
    const preview = getSelectedPreviewItem();
    const explain = preview.question.explain;

    const editor = useEditorQuestion(explain, updateExplainText);
    return (
        <div className={cx('modal-overlay')}>
            <div className={cx('modal')}>
                <div className={cx('modal-header')}>
                    <button className={cx('back')} onClick={onClose}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span style={{ marginLeft: '6px' }}>Close</span>
                    </button>
                    <div className={cx('actions')}>
                        <button className={cx('save')}>
                            <FontAwesomeIcon icon={faFloppyDisk} />
                            <span style={{ marginLeft: '6px' }}>Save answer explanation</span>
                        </button>
                        <button
                            className={cx('delete')}
                            onClick={() => {
                                if (editor) {
                                    updateExplainText(explain.id, '');
                                }
                                onClose();
                            }}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                            <span style={{ marginLeft: '6px' }}>Delete</span>
                        </button>
                    </div>
                </div>
                <div className={cx('modal-body')}>
                    {/* <div className={cx('left')} style={{ visibility: 'hidden' }}></div> */}
                    {/* monospace */}
                    <div className={cx('right')}>
                        <div style={{ position: 'relative' }}>
                            {editor.getText().length < 1 && (
                                <div className={cx('placeholder')}>Enter the ideal response for this question</div>
                            )}
                            <EditorContent editor={editor} />
                        </div>
                        <div className={cx('counter')}>{editor.getText().length} / 10000</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnswerExplainTemplate;
