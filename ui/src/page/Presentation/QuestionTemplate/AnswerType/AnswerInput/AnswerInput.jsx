import classNames from 'classnames/bind';
import styles from './AnswerInput.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AnswerInput(params) {
    return (
        <div className={cx('wrapper')}>
            {/* Teacher input */}
            <div className={cx('input-group-contain')}>
                <div className={cx('input-group', { active: true })}>
                    <input type="text" placeholder="Type answer here" className={cx('input')} />
                </div>
                <button className={cx('settings-button')}>
                    <span className={cx('gear')}>
                        <FontAwesomeIcon icon={faGear} />
                    </span>
                </button>
            </div>

            {/* Student preview */}
            <div className={cx('student-view')}>
                <label className={cx('label')}>Student view</label>
                <input type="text" placeholder="Type your answer..." className={cx('student-input')} disabled />
            </div>
        </div>
    );
}

export default AnswerInput;
