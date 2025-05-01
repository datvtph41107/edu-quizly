import classNames from 'classnames/bind';
import styles from './AnswerEndedOpen.module.scss';

const cx = classNames.bind(styles);

function AnswerEndedOpen() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('student-view')}>
                <p className={cx('placeholder')}>Students will type their response here (max 1000 characters)</p>
                <div className={cx('cursor')} />
            </div>
        </div>
    );
}

export default AnswerEndedOpen;
