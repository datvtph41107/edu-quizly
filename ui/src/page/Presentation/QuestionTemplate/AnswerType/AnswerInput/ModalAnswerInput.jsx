// ModalSettings.js
import React from 'react';
import styles from './ModalSettings.module.scss';
import classNames from 'classnames/bind';
import image1 from '~/assets/image/quizziz1.png';
import image2 from '~/assets/image/quizziz2.png';

const cx = classNames.bind(styles);

function ModalSettings({ inputType, onChangeType, onClose, onSave, boxLocked }) {
    return (
        <div className={cx('modal-overlay')}>
            <div className={cx('modal')}>
                <div className={cx('box-contain')}>
                    <div className={cx('box-title')}>
                        <div className={cx('block-box')}></div>
                    </div>
                    <h2 className={cx('title')}>Fill in the Blank settings</h2>
                </div>

                <div className={cx('option-group-contain')}>
                    <div className={cx('option-group')}>
                        <div className={cx('option-wrapper')}>
                            <label className={cx('option', { disabled: boxLocked })}>
                                <img src={image1} alt="Separate boxes" className={cx('option-image')} />
                                <div className={cx('opt-group-box')}>
                                    <input
                                        type="radio"
                                        value="boxes"
                                        checked={inputType === 'boxes'}
                                        onChange={() => onChangeType('boxes')}
                                        disabled={boxLocked}
                                    />
                                    <span className={cx('option-label')}>Separate boxes</span>
                                </div>
                                {boxLocked && <div className={cx('option-disabled-overlay')} />}
                            </label>
                        </div>

                        <div className={cx('option-wrapper')}>
                            <label className={cx('option')}>
                                <img src={image2} alt="Single input field" className={cx('option-image')} />
                                <div className={cx('opt-group-box')}>
                                    <input
                                        type="radio"
                                        value="text"
                                        checked={inputType === 'text'}
                                        onChange={() => onChangeType('text')}
                                    />
                                    <span className={cx('option-label')}>Single input field</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* ... phần còn lại giữ nguyên ... */}

                    <div className={cx('alternative-contain')}>
                        <label className={cx('alternative-label')}>Alternative answers</label>
                        <label className={cx('switch')}>
                            <input type="checkbox" />
                            <span className={cx('slider')}></span>
                        </label>
                    </div>

                    <div className={cx('alternative-contain')}>
                        <div className={cx('alternative-contain-group')}>
                            <label className={cx('alternative-label')}>Answers Hints</label>
                            <p className={cx('alternative-label-ds')}>
                                Write a custom hint to show the students if they're struggling with the answer
                            </p>
                            <div style={{ position: 'relative' }}>
                                <input
                                    className={cx('alternative-input')}
                                    type="text"
                                    placeholder="Enter your hint here..."
                                />
                                <div className={cx('alternative-amount')}>0/120</div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('alternative-contain')}>
                        <div className={cx('alternative-label-group')}>
                            <label className={cx('alternative-label')}>Ignore accent marks like à, á, â</label>
                            <span>Both “café” and “cafe” will be considered correct</span>
                        </div>
                        <label className={cx('switch')}>
                            <input type="checkbox" />
                            <span className={cx('slider')}></span>
                        </label>
                    </div>
                    <div className={cx('alternative-contain')}>
                        <div className={cx('alternative-label-group')}>
                            <label className={cx('alternative-label')}>Show your work</label>
                            <span>Students can upload images alongside their answer</span>
                        </div>
                        <label className={cx('switch')}>
                            <input type="checkbox" />
                            <span className={cx('slider')}></span>
                        </label>
                    </div>
                </div>

                <div className={cx('actions')}>
                    <button className={cx('cancel')} onClick={onClose}>
                        Cancel
                    </button>
                    <button className={cx('save')} onClick={onSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalSettings;
