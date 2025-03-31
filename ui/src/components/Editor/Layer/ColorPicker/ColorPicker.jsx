import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ColorPicker.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFont } from '@fortawesome/free-solid-svg-icons';
import { Utils } from '~/utils/Utils';

const cx = classNames.bind(styles);

function ColorPicker({ editor, elementId, fn }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#fffff');

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
        setIsDropdownOpen(false);
    };

    return (
        <div className={cx('color-picker-wrapper')}>
            <button className={cx('box-btn')} onClick={toggleDropdown}>
                <div style={{ boxShadow: '0px -2px 0px inset', color: selectedColor }} className={cx('box-btn-grap')}>
                    <FontAwesomeIcon icon={faFont} className={cx('box-icc')} />
                </div>
            </button>

            {isDropdownOpen && (
                <div className={cx('color-dropdown')}>
                    <div className={cx('color-option')}>
                        {Utils.colorOptions.map((color, index) => (
                            <div
                                key={index}
                                onClick={() => handleColorChange(color)}
                                className={cx('color-option-item')}
                                style={{ backgroundColor: color }}
                            ></div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ColorPicker;
