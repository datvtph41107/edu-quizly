import classNames from 'classnames/bind';
import styles from './FontFamily.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Utils } from '~/utils/Utils';

const cx = classNames.bind(styles);

function FontFamily({ editor }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [font, setFont] = useState('Quicksand');

    const toggleDropdown = () => {
        editor.commands.focus();
        setIsDropdownOpen((prev) => !prev);
    };

    const handleFontChange = (font) => {
        setFont(font);
        editor.chain().focus().setFontFamily(font).run();
        setIsDropdownOpen(false);
    };

    return (
        <div className={cx('section-family')}>
            <div className={cx('section-label')}>
                Font (with selected value) {editor?.isActive('textStyle', { fontFamily: font }) ? font : 'Quicksand'}
            </div>
            <div className={cx('section-wrap')}>
                <button type="button" className={cx('section-dropdown')} onClick={toggleDropdown}>
                    <span>{editor?.isActive('textStyle', { fontFamily: font }) ? font : 'Quicksand'}</span>
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
        </div>
    );
}

export default FontFamily;
