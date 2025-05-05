import classNames from 'classnames/bind';
import styles from './AnswerExplain.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import useStore from '~/features/store';
import AnswerExplainTemplate from './AnswerExplainTemplate';

const cx = classNames.bind(styles);

function AnswerExplain() {
    const { setAnswerExplainOpen, answerExplainOpen } = useStore();

    const backSide = () => {
        setAnswerExplainOpen(!answerExplainOpen);
    };
    return (
        <div style={{ position: 'relative' }}>
            <div className={cx('explain-wrapper')}>
                <button className={cx('explain-button')} onClick={backSide}>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faLightbulb} />
                    </span>
                    <span className={cx('text')}>Edit answer explanation</span>
                </button>
            </div>
            {answerExplainOpen && <AnswerExplainTemplate onClose={backSide} />}
        </div>
    );
}

export default AnswerExplain;
