import React, { useEffect, useRef, useState } from 'react';
import styles from './QuestionTemplate.module.scss';
import classNames from 'classnames/bind';
import { EditorContent } from '@tiptap/react';
import { useEditorQuestion } from '~/hooks/useEditorInstance';
import useStore from '~/features/store';
import AnswerBox from './AnswerType/AnswerBox/AnswerBox';
import { QA_ENDED_OPEN, QA_INPUT_BLANK, QA_MULTIPLE_CHOICE, QA_POLL } from '~/utils/Const';
import AnswerInput from './AnswerType/AnswerInput/AnswerInput';
import AnswerEndedOpen from './AnswerType/AnswerEndedOpen/AnswerEndedOpen';

const cx = classNames.bind(styles);

function QuestionTemplate({ selectedSlide }) {
    const { updateQuestionText } = useStore();
    const [active, setActive] = useState(false);
    const { question } = selectedSlide;
    const boxRef = useRef(null);

    const editor = useEditorQuestion(question, updateQuestionText); // init main editor question mark

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

    const renderAnswerContent = () => {
        switch (question.type) {
            case QA_MULTIPLE_CHOICE:
                return <AnswerBox question={question} />;

            case QA_INPUT_BLANK:
                return <AnswerInput />;

            case QA_ENDED_OPEN:
                return <AnswerEndedOpen />;

            case QA_POLL:
                return <AnswerBox question={question} isPoll />;
            default:
                break;
        }
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

                {renderAnswerContent()}
            </div>
        </div>
    );
}

export default QuestionTemplate;
