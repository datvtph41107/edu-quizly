import Button from '~/components/Button';
import styles from './HeaderSlide.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faGear, faPlay } from '@fortawesome/free-solid-svg-icons';
import Logo from '~/components/Logo';
import SlidePreviewModal from './SlidePreviewModal';
import { useState } from 'react';

const cx = classNames.bind(styles);

function HeaderSlide() {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div>
                    <Logo className={cx('custom')} size="18px" />
                </div>
                <div className={cx('contain')}>
                    <div className={cx('contain-main')}>
                        <Button
                            onClick={() => setIsPreviewOpen(true)}
                            className={cx('hover')}
                            leftIcon={<FontAwesomeIcon icon={faPlay} />}
                            medium
                            outline
                        >
                            Preview
                        </Button>
                        <Button className={cx('hover')} leftIcon={<FontAwesomeIcon icon={faGear} />} medium outline>
                            Settings
                        </Button>
                        <Button
                            className={cx('bold')}
                            leftIcon={<FontAwesomeIcon icon={faCloudArrowUp} />}
                            medium
                            outline
                        >
                            Publish
                        </Button>
                    </div>
                </div>
            </div>
            <SlidePreviewModal show={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
        </div>
    );
}

export default HeaderSlide;
