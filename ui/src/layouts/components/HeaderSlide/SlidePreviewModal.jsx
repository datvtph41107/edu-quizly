import React, { useState } from 'react';
import styles from './SlidePreviewModal.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SlidePreviewModal({ show, onClose }) {
    if (!show) return null;

    return (
        <div className={cx('overlay')}>
            <div className={cx('modal')}>
                <button className={cx('close-btn')} onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className={cx('slide-container')}>
                    <h2 className={cx('question')}>What color you can use?</h2>
                    <input className={cx('input')} placeholder="Type your answer..." />
                    <p className={cx('hint')}>Hint: color spring</p>
                </div>
            </div>
        </div>
    );
}

export default SlidePreviewModal;
