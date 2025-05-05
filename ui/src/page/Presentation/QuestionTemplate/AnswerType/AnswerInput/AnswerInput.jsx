import classNames from 'classnames/bind';
import styles from './AnswerInput.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ModalSettings from './ModalAnswerInput';

const cx = classNames.bind(styles);

function AnswerInput() {
    const [showModal, setShowModal] = useState(false);
    const [inputType, setInputType] = useState('text');
    const [tempType, setTempType] = useState(inputType);
    const [boxLocked, setBoxLocked] = useState(false);
    const [inputText, setInputText] = useState('');

    return (
        <div className={cx('wrapper')}>
            {/* Teacher input */}
            <div className={cx('input-group-contain')}>
                <div className={cx('input-group-col')}>
                    <div className={cx('input-group')}>
                        <div className={cx('input', { active: false })}>
                            <input
                                type="text"
                                placeholder="Type answer here"
                                value={inputText}
                                onChange={(e) => {
                                    const text = e.target.value;
                                    setInputText(text);

                                    if (text.length > 40 && inputType === 'boxes') {
                                        setInputType('text');
                                        setTempType('text');
                                        setBoxLocked(true);
                                    }
                                }}
                            />
                            <div className={cx('text')}>{inputText.length}</div>
                        </div>
                        <button className={cx('settings-button')} onClick={() => setShowModal(true)}>
                            <span className={cx('gear')}>
                                <FontAwesomeIcon icon={faGear} />
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Student preview */}
            <div className={cx('student-view')}>
                <label className={cx('label')}>Student view</label>

                {inputType === 'boxes' && inputText.length <= 40 ? (
                    <div className={cx('box-input-container')}>
                        {(inputText ? inputText.split('') : Array(8).fill('')).map((char, idx) => (
                            <input key={idx} value={char} disabled className={cx('box-input')} />
                        ))}
                    </div>
                ) : (
                    <input type="text" placeholder="Type your answer..." disabled className={cx('student-input')} />
                )}
            </div>
            {showModal && (
                <ModalSettings
                    inputType={tempType}
                    onChangeType={(type) => setTempType(type)}
                    onClose={() => setShowModal(false)}
                    onSave={() => {
                        setInputType(tempType);
                        setShowModal(false);
                    }}
                    boxLocked={boxLocked}
                />
            )}
        </div>
    );
}

export default AnswerInput;
