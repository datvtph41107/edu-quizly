import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FontSize.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import useStore from '~/features/store';
import { Utils } from '~/utils/Utils';
import { updateEditorState } from '~/components/ElementTypes/ElementTypes';
import { useStateContext } from '~/context/ContextProvider';

const cx = classNames.bind(styles);

function FontSize({ editor, elementId, fn }) {
    const { setChangeEditorType, changeEditorType } = useStateContext();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        editor.commands.focus();
        setIsDropdownOpen((prev) => !prev);
    };

    const handleFontSizeChange = (size) => {
        editor.commands.focus();
        editor.commands.setFontSize(size);
        updateEditorState({ editor, setChangeEditorType: setChangeEditorType, value: size, name: 'fontSize' });
        setIsDropdownOpen(false);
    };
    const currentSize = editor?.getAttributes('textStyle').fontSize;

    return (
        <div className={cx('section-family', 'w-20')}>
            <div className={cx('section-label')}>Font Size (Selected: {currentSize ?? 18})</div>
            <div className={cx('section-wrap')}>
                <button type="button" className={cx('section-dropdown')} onClick={toggleDropdown}>
                    <span>{currentSize ?? 18} px</span>
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
