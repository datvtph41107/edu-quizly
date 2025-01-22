import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AdminLayoutCustomize.module.scss';
import classNames from 'classnames/bind';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AdminLayoutCustomize({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('head-box')}>
                    <div className={cx('tooltip')}>
                        <FontAwesomeIcon icon={faRightToBracket} />
                        {/* <span className={cx('tooltip-text')}>Back</span> */}
                    </div>
                </div>
                <span className={cx('head-title')}>Create a new Lesson</span>
            </div>
            {children}
        </div>
    );
}

export default AdminLayoutCustomize;
