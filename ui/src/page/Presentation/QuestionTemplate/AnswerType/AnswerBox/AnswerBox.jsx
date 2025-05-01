import classNames from 'classnames/bind';
import styles from './AnswerBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AnswerTemplate from './AnswerTemplate';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import useStore from '~/features/store';

const cx = classNames.bind(styles);

function AnswerBox({ question, isPoll = false }) {
    const {
        editors,
        mouteAnswerDisplay,
        updateAnswerCorrect,
        unmouteAnswerDisplay,
        updateAnswerText,
        changeModeSetting,
    } = useStore();
    const answersCount = question.answers.filter((ans) => !ans.disable).length;
    const currentMode = question.mode;

    const handleAddNewAnswer = () => {
        mouteAnswerDisplay(question.answers);
    };

    return (
        <>
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
                            isPoll={isPoll}
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
                        {isPoll ? 'Single choice' : 'Single correct answer'}
                    </button>
                    <button
                        className={cx('multiple', { active: currentMode === 'multiple' })}
                        onClick={() => {
                            if (currentMode !== 'multiple') changeModeSetting('multiple');
                        }}
                    >
                        {isPoll ? 'Multiple choice' : 'Multiple correct answers'}
                    </button>
                </div>
            </div>
        </>
    );
}

export default AnswerBox;
