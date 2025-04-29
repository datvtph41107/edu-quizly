import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './SelectPreviewSlide.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QaSlide from './QaSlide';
import TpSlide from './TpSlide';

const cx = classNames.bind(styles);

function SelectPreviewSlide() {
    return (
        <>
            <div className={cx('side-preview')}>
                <div className={cx('side-preview-wrapper')}>
                    <div className={cx('slide-creator-section')}>
                        <h2 className={cx('section-one-title')}>Find pre-made questions</h2>
                        <h3 className={cx('section-one-subtitle')}>
                            <span>Search Quizizz Library</span>
                        </h3>
                        <button className={cx('section-search-btn')}>
                            Search for questions <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                        <div className={cx('section-line-wrap')}>
                            <p>OR</p>
                            <div className={cx('section-line')}></div>
                        </div>
                    </div>
                    <TpSlide />
                    <QaSlide />
                </div>
            </div>
        </>
    );
}

export default SelectPreviewSlide;
