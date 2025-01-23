import classNames from 'classnames/bind';
import style from './Logo.module.scss';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(style);

function Logo({ title, className, size = '22px' }) {
    const classes = cx('wrapper', {
        // .wrapper {} .primary{}
        [className]: className,
    });

    return (
        <div className={classes}>
            <div className={cx('logo')}>
                Quizly.<span style={{ fontSize: size }}>Edu</span>
            </div>

            {title && (
                <div className={cx('title')}>
                    <div className={cx('text')}>{title}</div>
                </div>
            )}
        </div>
    );
}

export default Logo;
