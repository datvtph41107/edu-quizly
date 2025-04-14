import styles from './SidebarPreview.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaste, faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SidebarPreviewItem({ isSelected, countSlide, elements, onSelect, copyNewSlide, removeSlide }) {
    const scale = 0.2;

    return (
        <div className={cx('side-preview-container')}>
            <div
                style={{ color: isSelected ? 'white' : 'black' }}
                className={cx('side-preview-contain', { selected: isSelected, hold: !isSelected })}
            >
                <div className={cx('side-nav-contain')}>
                    <div className={cx('side-nav-contain-count')}>{countSlide}</div>
                    <div className={cx('side-nav-contain-icon')} onClick={copyNewSlide}>
                        <FontAwesomeIcon icon={faPaste} />
                    </div>
                    <div className={cx('side-nav-contain-icon')} onClick={removeSlide}>
                        <FontAwesomeIcon icon={faTrash} />
                    </div>
                </div>
                <div className={cx('side-main-contain')} onClick={onSelect}>
                    <div className={cx('side-main-container')}>
                        <div className={cx('preview-item-wrapper')}>
                            <div className={cx('preview-item-block')}>
                                {elements.map((element, index) => (
                                    <div
                                        key={index}
                                        className={cx('preview-item')}
                                        style={{
                                            left: `${element.transform.position.x * scale}px`,
                                            top: `${element.transform.position.y * scale}px`,
                                            width: `${element.transform.size.width * scale}px`,
                                            height: `${element.transform.size.height * scale}px`,
                                        }}
                                    >
                                        {element.data.html}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarPreviewItem;
