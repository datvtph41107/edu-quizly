import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SidebarPreview.module.scss';
import classNames from 'classnames/bind';
import { faPaste, faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SidebarPreviewItem({ id, isSelected, onSelect }) {
    return (
        <div className={cx('side-preview-container')} onClick={() => onSelect(id)}>
            <div className={cx('side-preview-contain', { selected: isSelected })}>
                <div className={cx('side-nav-contain')}>
                    <div className={cx('side-nav-contain-count')}>{id}</div>
                    <div className={cx('side-nav-contain-icon')}>
                        <FontAwesomeIcon icon={faPaste} />
                    </div>
                    <div className={cx('side-nav-contain-icon')}>
                        <FontAwesomeIcon icon={faTrash} />
                    </div>
                </div>
                <div className={cx('side-main-contain')}>
                    <div className={cx('side-main-container')}></div>
                </div>
            </div>
        </div>
    );
}

export default SidebarPreviewItem;
