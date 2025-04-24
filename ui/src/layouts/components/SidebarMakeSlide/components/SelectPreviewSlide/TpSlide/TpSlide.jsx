import styles from '../SelectPreviewSlide.module.scss';
import classNames from 'classnames/bind';
import useStore from '~/features/store';
import { useStateContext } from '~/context/ContextProvider';
import { Utils } from '~/utils/Utils';

const cx = classNames.bind(styles);

function TpSlide() {
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
        <div className={cx('slide-creator-section')}>
            <h2 className={cx('section-two-title')}>Select slide type</h2>
            <div className={cx('section-group')}>
                {Utils.SLIDE_TYPE.map((item, index) => (
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
    );
}

export default TpSlide;
