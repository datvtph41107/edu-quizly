import React, { useEffect, useRef, useState } from 'react';
import styles from './QuestionTemplate.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { EditorContent } from '@tiptap/react';
import AnswerTemplate from './AnswerTemplate';
import { useEditorQuestion } from '~/hooks/useEditorInstance';
import useStore from '~/features/store';

const cx = classNames.bind(styles);

function QuestionTemplate({ selectedSlide, editors }) {
    const { mouteAnswerDisplay, unmouteAnswerDisplay, updateAnswerCorrect, updateQuestionText, updateAnswerText } =
        useStore();
    const { question } = selectedSlide;
    const currentMode = question.mode;
    // const editor = editors[question.id] || null;
    const [active, setActive] = useState(false);
    const boxRef = useRef(null);
    const answersCount = question.answers.filter((ans) => !ans.disable).length;
    const editor = useEditorQuestion(question, updateQuestionText); // init main editor question mark
    // // answers runner mark
    // Array.from({ length: 5 }).map((_, index) => {
    //     const answerRunnerId = question.answers[index].id;
    //     return useEditorQuestion(answerRunnerId, updateAnswerText);
    // });

    useEffect(() => {
        function handleClickOutside(event) {
            if (boxRef.current && !boxRef.current.contains(event.target)) {
                setActive(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleAddNewAnswer = () => {
        mouteAnswerDisplay(question.answers);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div
                    ref={boxRef}
                    onClick={() => {
                        editor.commands.focus();
                        setActive(true);
                    }}
                    className={cx('question-box', {
                        active: active,
                    })}
                >
                    <div className={cx('question-box-content')}>
                        {editor?.isEmpty && <p className={cx('question-placeholder')}>Type question here...</p>}
                        <EditorContent editor={editor} />
                    </div>
                </div>

                <div className={cx('answers')}>
                    {question.answers
                        .filter((ans) => !ans.disable)
                        .map((ans, i) => (
                            <AnswerTemplate
                                key={i}
                                index={i}
                                ans={ans}
                                question={question}
                                updateAnswerCorrect={updateAnswerCorrect}
                                unmouteAnswerDisplay={unmouteAnswerDisplay}
                                editors={editors}
                                answersCount={answersCount}
                                updateAnswerText={updateAnswerText}
                            />
                        ))}
                    {answersCount < 5 && (
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
