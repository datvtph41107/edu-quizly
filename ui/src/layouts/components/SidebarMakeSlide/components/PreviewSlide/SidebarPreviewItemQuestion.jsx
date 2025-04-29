import styles from './SidebarPreview.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPaste, faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Popper from '~/components/Popper';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function SidebarPreviewItemQuestion({
    isSelected,
    countSlide,
    question,
    onSelect,
    copyNewSlide,
    removeSlide,
    validateQuestionAndAnswers,
}) {
    const [showTooltip, setShowTooltip] = useState(false);
    const btnRef = useRef(null);

    const result = validateQuestionAndAnswers(question.id, question.answers);

    const content = result.answers_empty
        ? result.messages.answers
        : result.question_empty
        ? result.messages.question
        : '';

    return (
        <div className={cx('side-preview-container')}>
            <div className={cx('side-preview-contain', { selected: isSelected, hold: !isSelected })}>
                <div className={cx('side-nav-contain')} style={{ color: isSelected ? 'white' : 'black' }}>
                    <div className={cx('side-nav-contain-count')}>{countSlide}</div>
                    <div className={cx('side-nav-contain-icon')} onClick={copyNewSlide}>
                        <FontAwesomeIcon icon={faPaste} />
                    </div>
                    <div className={cx('side-nav-contain-icon')} onClick={removeSlide}>
                        <FontAwesomeIcon icon={faTrash} />
                    </div>
                </div>
                <div className={cx('side-main-contain')} onClick={onSelect}>
                    <div className={cx('side-main-container', 'qna')}>
                        <div className={cx('preview-item-wrapper')}>
                            <div className={cx('preview-head')}>
                                <button className={cx('check-btn')}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </button>
                                {!result.isValid && (
                                    <Popper
                                        show={showTooltip}
                                        offset={[0, 0]}
                                        placement="right"
                                        content={content}
                                        valid
                                        color="#ec0b43"
                                    >
                                        <button
                                            ref={btnRef}
                                            className={cx('valid-btn')}
                                            onMouseEnter={() => setShowTooltip(true)}
                                            onMouseLeave={() => setShowTooltip(false)}
                                        >
                                            <FontAwesomeIcon icon={faTriangleExclamation} />
                                        </button>
                                    </Popper>
                                )}
                            </div>
                            <div
                                className={cx('preview-item-block-qa')}
                                dangerouslySetInnerHTML={{ __html: question.text || '' }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarPreviewItemQuestion;
