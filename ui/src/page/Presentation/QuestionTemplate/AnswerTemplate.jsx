import React, { useState } from 'react';
import styles from './QuestionTemplate.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import useStore from '~/features/store';
import { EditorContent, useEditor } from '@tiptap/react';
import { extensions } from '~/components/ElementTypes/ElementTypes';

const cx = classNames.bind(styles);

function AnswerTemplate({ ans, question }) {
    const { updateAnswerCorrect, removeAnswer, registerEditor, editors } = useStore();
    const currentMode = question.mode;
    const [active, setActive] = useState(false);
    const editor = useEditor({
        editable: true,
        extensions: extensions,
        onCreate: ({ editor }) => {
            editor.commands.setTextAlign('center');
            registerEditor(question.id, editor);
        },

        onSelectionUpdate: ({ editor }) => {
            if (editor.isEmpty) {
                editor.commands.setTextAlign('center');
            }
        },
        onUpdate: ({ editor }) => {},
        onFocus: () => {
            setActive(true);
        },
        onBlur: () => {
            setActive(false);
        },
    });

    const toggleCorrect = (id) => {
        updateAnswerCorrect(id);
    };

    const handleRemoveAnswer = (id) => {
        removeAnswer(id);
    };

    return (
        <div className={cx('answer-card', ans.color)}>
            <div className={cx('answers-event', { end: question.answers.length === 2 })}>
                {question.answers.length > 2 && (
                    <button className={cx('delete-btn')} onClick={() => handleRemoveAnswer(ans.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                )}
                <button
                    type="checkbox"
                    className={cx('check-btn', { [currentMode]: currentMode }, { correct: ans.isCorrect })}
                    onClick={() => toggleCorrect(ans.id)}
                >
                    <FontAwesomeIcon icon={faCheck} />
                </button>
            </div>
            <div className={cx('answers-board-type', { active: active })} onClick={() => editor.commands.focus()}>
                <div className={cx('editor-wrapper')}>
                    {editor.isEmpty && <p className={cx('answer-placeholder')}>Type answer option here...</p>}
                    <EditorContent className="answer" editor={editor} />
                </div>
            </div>
        </div>
    );
}

export default AnswerTemplate;
