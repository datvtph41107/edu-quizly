import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './SelectPreviewSlide.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Utils } from '~/utils/Utils';
import useStore from '~/features/store';
import { useStateContext } from '~/context/ContextProvider';

const cx = classNames.bind(styles);

function SelectPreviewSlide() {
    const { setOpenSlide } = useStateContext();
    const { addNewSlide } = useStore();
    const slideTypeActions = {
        blank: () => {
            addNewSlide();
            setOpenSlide({
                open: false,
                back: false,
            });
        },
        title: () => console.log('Create title slide'),
        text: () => console.log('Create text slide'),
        textMedia: () => console.log('Create text + media slide'),
        fullscreenMedia: () => console.log('Create fullscreen media slide'),
        WebPageLink: () => console.log('Create link slide'),
    };

    const handleSelectSlideType = (type) => {
        const action = slideTypeActions[type];
        if (action) {
            action();
        } else {
            console.warn(`Unknown slide type: ${type}`);
        }
    };

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
                    <div className={cx('slide-creator-section')}>
                        <h2 className={cx('section-two-title')}>Select slide type</h2>
                        <div className={cx('section-group')}>
                            {Utils.slideTypes.map((item, index) => (
                                <div
                                    className={cx('section-group-item')}
                                    key={index}
                                    onClick={() => handleSelectSlideType(item.type)}
                                >
                                    <div
                                        className={cx('section-group-slide-main')}
                                        style={{ backgroundPosition: item.backgroundPosition, filter: 'invert(1)' }}
                                    ></div>
                                    <div className={cx('section-group-des')}>
                                        <span>{item.span}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx('slide-creator-section')}>
                        <h2 className={cx('section-two-title')}>Create manually</h2>
                        <div className={cx('section-group')}>
                            {Utils.buttonData.map((button, index) => (
                                <div key={index} style={{ marginBottom: '8px' }}>
                                    <button className={cx('section-manualy')}>
                                        <span className={cx(button.bgClass)}>
                                            <div className={cx(button.overlayClass)}></div>
                                            {button.icon ? (
                                                <FontAwesomeIcon icon={button.icon} style={button.iconStyle} />
                                            ) : (
                                                button.blank && <div className={cx('blank')}></div>
                                            )}
                                        </span>
                                        <div className={cx('section-group-des')}>
                                            <span>{button.text}</span>
                                        </div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SelectPreviewSlide;
