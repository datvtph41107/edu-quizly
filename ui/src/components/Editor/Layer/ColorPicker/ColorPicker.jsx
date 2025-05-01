import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ColorPicker.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFont } from '@fortawesome/free-solid-svg-icons';
import ColorPickerOption from '../ColorPickerOption';

const cx = classNames.bind(styles);

function ColorPicker({ editor, tab }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    console.log(editor);

    const toggleDropdown = () => {
        editor.commands.focus();
        setIsDropdownOpen((prev) => !prev);
    };

    const handleColorChange = (color) => {
        editor.chain().focus().setColor(color).run();
        setIsDropdownOpen(false);
    };

    return (
        <div className={cx('color-picker-wrapper')}>
            <button className={cx('box-btn')} onClick={toggleDropdown}>
                <div
                    style={{
                        boxShadow: '0px -2px 0px inset',
                        color: editor?.getAttributes('textStyle').color ?? '#ffff',
                    }}
                    className={cx('box-btn-grap')}
                >
                    <FontAwesomeIcon icon={faFont} className={cx('box-icc')} />
                </div>
            </button>

            {isDropdownOpen && <ColorPickerOption fn={handleColorChange} tab={tab} />}
        </div>
    );
}

export default ColorPicker;
