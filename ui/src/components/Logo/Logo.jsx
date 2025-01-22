import classNames from 'classnames/bind';
import style from './Logo.module.scss';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(style);

function Logo({ title }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                Quizly.<span style={{ fontSize: '22px' }}>Edu</span>
            </div>

            <div className={cx('title')}>
                <div className={cx('text')}>{title}</div>
            </div>
        </div>
    );
}

export default Logo;
