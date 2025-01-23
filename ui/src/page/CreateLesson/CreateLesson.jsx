import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './CreateLesson.module.scss';
import classNames from 'classnames/bind';
import { faArrowPointer, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useStateContext } from '~/context/ContextProvider';
import { routes } from '~/config/routes';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function CreateLesson() {
    const { showLoading, hideLoading } = useStateContext();
    const navigate = useNavigate();
    const handleLessonClick = () => {
        showLoading();
        setTimeout(() => {
            hideLoading();
            navigate(routes.createPresentSlide);
        }, 500);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('lesson-title')}>
                <span>Create a new Lesson</span>
            </div>
            <div className={cx('lesson-content')}>
                <div className={cx('lesson')}>
                    <div className={cx('description')}>
                        <h3>Create from Google Slides</h3>
                        <span>Use the Quizly slide Add-on</span>
                    </div>
                </div>
                <div className={cx('lesson')}>
                    <div className={cx('description')}>
                        <h3>Import Slides</h3>
                        <span>from Google Driver or upload any PDF</span>
                    </div>
                </div>
                <div className={cx('lesson')} onClick={handleLessonClick}>
                    <div className={cx('content')}>
                        <div className={cx('bg')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faPlus} />
                        </div>
                    </div>
                    <div className={cx('poin')}>
                        <FontAwesomeIcon icon={faArrowPointer} />
                    </div>
                    <div className={cx('description')}>
                        <h3>Create from scratch</h3>
                        <span>Start by adding a new Slide</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateLesson;
