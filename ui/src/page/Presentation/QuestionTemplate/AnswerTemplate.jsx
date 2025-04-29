import React, { useEffect, useRef, useState } from 'react';
import styles from './QuestionTemplate.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EditorContent } from '@tiptap/react';
import Popper from '~/components/Popper';
import { useEditorQuestion } from '~/hooks/useEditorInstance';

const cx = classNames.bind(styles);

function AnswerTemplate({
    ans,
    index,
    question,
    updateAnswerCorrect,
    unmouteAnswerDisplay,
    answersCount,
    updateAnswerText,
}) {
    const currentMode = question.mode;
    const [active, setActive] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const editor = useEditorQuestion(ans, updateAnswerText);

    const boxRef = useRef(null);

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

    const toggleCorrect = (id) => {
        if (editor.isEmpty) {
            setShowTooltip(true);
        } else {
            updateAnswerCorrect(id);
        }
    };

    const handleRemoveAnswer = (id) => {
        unmouteAnswerDisplay(id, false);
        editor.commands.clearContent();
    };

    const availableColors = ['blue', 'teal', 'yellow', 'red', 'purple'];
    return (
        <div className={cx('answer-card', availableColors[index])}>
            <div className={cx('answers-event', { end: answersCount === 2 })}>
                {answersCount > 2 && (
                    <button className={cx('delete-btn')} onClick={() => handleRemoveAnswer(ans.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                )}
                <Popper
                    show={showTooltip}
                    offset={[0, 6]}
                    placement="top"
                    content="Please add text before check correct"
                    valid
                    color="#ec0b43"
                    // className={cx('valid-preview')}
                >
                    <button
                        className={cx('check-btn', { [currentMode]: currentMode }, { correct: ans.isCorrect })}
                        onClick={() => toggleCorrect(ans.id)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
                </Popper>
            </div>
            <div
                ref={boxRef}
                className={cx('answers-board-type', { active: active })}
                onClick={() => {
                    editor.commands.focus();
                    setActive(true);
                }}
            >
                <div className={cx('editor-wrapper')}>
                    {editor?.isEmpty && (
                        <p
                            className={cx('answer-placeholder', {
                                top: answersCount >= 4,
                            })}
                        >
                            Type answer option here...
                        </p>
                    )}
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    );
}

export default AnswerTemplate;
