import classNames from 'classnames/bind';
import styles from './FontFamily.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Utils } from '~/utils/Utils';

const cx = classNames.bind(styles);

function FontFamily({ editor, elementId, fn }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedFont, setSelectedFont] = useState('Quicksand');

    const toggleDropdown = () => {
        editor.commands.focus();

        setIsDropdownOpen((prev) => !prev);
    };

    const handleFontChange = (font) => {
        setSelectedFont(font);
        editor.chain().focus().setFontFamily(font).run();
        setIsDropdownOpen(false);
    };

    return (
        <div className={cx('section-family')}>
            <div className={cx('section-label')}>Font (with selected value) {selectedFont}</div>
            <div className={cx('section-wrap')}>
                <button type="button" className={cx('section-dropdown')} onClick={toggleDropdown}>
                    <span>{selectedFont}</span>
                    <div className={cx('section-dropdown-node', { open: isDropdownOpen })}>
                        <FontAwesomeIcon icon={faCaretUp} />
                    </div>
                </button>

                {isDropdownOpen && (
                    <div className={cx('dropdown-options')}>
                        {Utils.fontOptions.map((font, index) => (
                            <div
                                key={index}
                                style={{ fontFamily: font }}
                                className={cx('dropdown-item')}
                                onClick={() => handleFontChange(font)}
                            >
                                {font}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* <div style={{ fontFamily: selectedFont }}>
                Đây là nội dung với font: {selectedFont}
            </div> */}
        </div>
    );
}

export default FontFamily;
