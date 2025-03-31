import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FontSize.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import useStore from '~/features/store';
import { Utils } from '~/utils/Utils';

const cx = classNames.bind(styles);

function FontSize({ editor, elementId, fn }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState('32');

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleFontSizeChange = (size) => {
        setSelectedSize(size);
        setIsDropdownOpen(false);
    };

    return (
        <div className={cx('section-family', 'w-20')}>
            <div className={cx('section-label')}>Font Size (Selected: {selectedSize})</div>
            <div className={cx('section-wrap')}>
                <button type="button" className={cx('section-dropdown')} onClick={toggleDropdown}>
                    <span>{selectedSize} px</span>
                    <div className={cx('section-dropdown-node', { open: isDropdownOpen })}>
                        <FontAwesomeIcon icon={faCaretUp} />
                    </div>
                </button>

                {isDropdownOpen && (
                    <div className={cx('dropdown-options')}>
                        {Utils.fontSizeOptions.map((size, index) => (
                            <div key={index} className={cx('dropdown-item')} onClick={() => handleFontSizeChange(size)}>
                                {size}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FontSize;
