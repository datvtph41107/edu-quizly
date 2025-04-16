import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FillColor.module.scss';
import useStore from '~/features/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFill } from '@fortawesome/free-solid-svg-icons';
import ColorPickerOption from '../ColorPickerOption';

const cx = classNames.bind(styles);

function FillColor({ editor }) {
    const { selectedSlideId, selectedElements, updateElementBackgroundColor } = useStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [color, setColor] = useState('black');

    const toggleDropdown = () => {
        editor?.commands.focus();
        setIsDropdownOpen((prev) => !prev);
    };

    const handleSelect = (color) => {
        if (!selectedElements?.element?.id) return;
        updateElementBackgroundColor({
            slideId: selectedSlideId,
            elementId: selectedElements.element.id,
            backgroundColor: color,
        });
        setIsDropdownOpen(false);
        setColor(color);
    };

    return (
        <div style={{ position: 'relative' }}>
            <button className={cx('box-btn')} onClick={toggleDropdown}>
                <div
                    style={{ boxShadow: '0px -2px 0px inset', color: color ?? 'black' }}
                    className={cx('box-btn-grap')}
                >
                    <FontAwesomeIcon icon={faFill} className={cx('box-icc')} />
                </div>
            </button>
            {isDropdownOpen && <ColorPickerOption fn={handleSelect} />}
        </div>
    );
}

export default FillColor;
