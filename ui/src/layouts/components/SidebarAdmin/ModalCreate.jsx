import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './ModalCreate.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';
import lesson from '~/assets/image/admin-modal/lesson.png';
import quiz from '~/assets/image/admin-modal/quiz.png';
import { useStateContext } from '~/context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { routes } from '~/config/routes';

const cx = classNames.bind(style);

function ModalCreate({ onClose, isModalOpen }) {
    const { showLoading, hideLoading } = useStateContext();
    const [showSlideElement, setShowSlideElement] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (isModalOpen) {
            timer = setTimeout(() => {
                setShowSlideElement(true);
            }, 300);
        } else {
            setShowSlideElement(false);
        }

        return () => clearTimeout(timer);
    }, [isModalOpen]);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains(cx('modal-backdrop'))) {
            onClose();
        }
    };

    const handleLessonClick = () => {
        showLoading();
        onClose();
        setTimeout(() => {
            hideLoading();
            navigate(routes.adminCreateLesson);
        }, 1500);
    };

    return (
        <div className={cx('modal-backdrop', { show: isModalOpen })} onClick={handleBackdropClick}>
            <div className={cx('modal')}>
                <div className={cx('close-nav')}>
                    <button className={cx('close-button')} onClick={onClose}>
                        ✖
                    </button>
                </div>
                <div className={cx('description')}>
                    <div className={cx('description-title')}>
                        <h2 className={cx('title')}>What would you like to create?</h2>
                        <p className={cx('cp')}>
                            1 / 20 Quizzes and Lessons Created <FontAwesomeIcon icon={faCircleExclamation} />
                        </p>
                    </div>
                    <div className={cx('options')}>
                        <div className={cx('option')}>
                            <div className={cx('opt-contain')}>
                                <div className={cx('opt-title')}>
                                    <Image src={quiz} className={cx('image')} />
                                    <h3>Assessment</h3>
                                </div>
                                <p>Make assessments and practice motivating with interactive questions</p>
                            </div>
                        </div>
                        <div className={cx('option')} onClick={handleLessonClick}>
                            <div className={cx('opt-contain')}>
                                <div className={cx('opt-title')}>
                                    <Image src={lesson} className={cx('image')} />
                                    <h3>Lesson</h3>
                                </div>
                                <p>Add fun and interactive slides to assessments that students already love</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('slide-element', { show: showSlideElement })}>
                        <h3>Sliding Element</h3>
                        <p>This is a sliding element that appears after the modal opens.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalCreate;
