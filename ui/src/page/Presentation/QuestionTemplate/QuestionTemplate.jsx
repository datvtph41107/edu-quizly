import React, { useState } from 'react';
import styles from './QuestionTemplate.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import useStore from '~/features/store';
import { EditorContent, useEditor } from '@tiptap/react';
import { extensions } from '~/components/ElementTypes/ElementTypes';
import AnswerTemplate from './AnswerTemplate';

const cx = classNames.bind(styles);

function QuestionTemplate({ selectedSlide }) {
    const { addNewAnswer, changeModeSetting, registerEditor } = useStore();
    const { question } = selectedSlide;
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
            console.log(112233);
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

    const handleAddNewAnswer = () => {
        addNewAnswer();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('question-box', { active: active })} onClick={() => editor.commands.focus()}>
                    <div className={cx('question-box-content')}>
                        {editor.isEmpty && <p className={cx('question-placeholder')}>Type question here...</p>}
                        <EditorContent editor={editor} />
                    </div>
                </div>

                <div className={cx('answers')}>
                    {question.answers.map((ans, i) => (
                        <AnswerTemplate key={i} ans={ans} question={question} />
                    ))}
                    {question.answers.length < 5 && (
                        <div className={cx('answer-plus')} onClick={handleAddNewAnswer}>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    )}
                </div>

                <div className={cx('answer-mode')}>
                    <div className={cx('answer-mode-block')}>
                        <button
                            className={cx('single', { active: currentMode === 'single' })}
                            onClick={() => {
                                if (currentMode !== 'single') changeModeSetting('single');
                            }}
                        >
                            Single correct answer
                        </button>
                        <button
                            className={cx('multiple', { active: currentMode === 'multiple' })}
                            onClick={() => {
                                if (currentMode !== 'multiple') changeModeSetting('multiple');
                            }}
                        >
                            Multiple correct answers
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionTemplate;
