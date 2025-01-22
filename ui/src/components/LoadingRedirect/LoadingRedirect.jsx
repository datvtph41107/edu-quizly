import React from 'react';
import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function LoadingRedirect({ title = 'Loading...' }) {
    return (
        <div className={cx('loading-wrapper')}>
            <div className={cx('logo-container')}>
                <div className={cx('wrapper')}>
                    <div className={cx('logo')}>
                        Quizly.<span style={{ fontSize: '22px' }}>Edu</span>
                    </div>

                    <div className={cx('title')}>
                        <div className={cx('text')}>{title}</div>
                    </div>
                </div>
            </div>
            <div className={cx('spinner')}>
                <FontAwesomeIcon icon={faCircleNotch} className={cx('icon')} />
            </div>
        </div>
    );
}

export default LoadingRedirect;
