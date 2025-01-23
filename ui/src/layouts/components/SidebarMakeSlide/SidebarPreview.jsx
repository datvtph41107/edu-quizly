import styles from './SidebarPreview.module.scss';
import classNames from 'classnames/bind';
import { faCloudArrowUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import SidebarPreviewItem from './SidebarPreviewItem';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const cx = classNames.bind(styles);

function SidebarPreview() {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelect = (id) => {
        setSelectedItem(id);
    };
    return (
        <div className={cx('sidebar')}>
            <div className={cx('sidebar-container')}>
                <div className={cx('sidebar-contain')}>
                    <ul className={cx('sidebar-list')}></ul>
                    <div className={cx('side-preview')}>
                        <div className={cx('side-preview-wrapper')}>
                            <SidebarPreviewItem id={1} isSelected={selectedItem === 1} onSelect={handleSelect} />
                            <SidebarPreviewItem id={2} isSelected={selectedItem === 2} onSelect={handleSelect} />
                            <SidebarPreviewItem id={3} isSelected={selectedItem === 3} onSelect={handleSelect} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('toast-bar')}>
                <button type="button" className={cx('btn', 'out')}>
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                    <span>Import</span>
                </button>
                <button type="button" className={cx('btn', 'pri')}>
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Add new slide</span>
                </button>
            </div>
        </div>
    );
}

export default SidebarPreview;
