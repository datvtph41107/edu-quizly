import classNames from 'classnames/bind';
import styles from './TextAlign.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCaretDown,
    faAlignLeft,
    faAlignJustify,
    faAlignRight,
    faAlignCenter,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useStateContext } from '~/context/ContextProvider';
import { updateEditorState } from '~/components/ElementTypes/ElementTypes';

const cx = classNames.bind(styles);

const control = [
    { id: 1, icon: faAlignLeft, alignment: 'left' },
    { id: 2, icon: faAlignCenter, alignment: 'center' },
    { id: 3, icon: faAlignRight, alignment: 'right' },
    { id: 4, icon: faAlignJustify, alignment: 'justify' },
];

function TextAlign({ editor }) {
    const { setChangeEditorType, changeEditorType } = useStateContext();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleChange = (alignment) => {
        if (editor) {
            editor.chain().focus().setTextAlign(alignment).run();
            const textAlignState = ['left', 'center', 'right', 'justify'].reduce((acc, alignment) => {
                acc[alignment] = { active: editor.isActive({ textAlign: alignment }) }; // Đảm bảo cập nhật đúng active
                return acc;
            }, {});

            setChangeEditorType((prev) => ({
                ...prev,
                textAlign: textAlignState,
            }));
        }
    };

    return (
        <div className={cx('section-family', 'w-12')}>
            <div className={cx('section-wrap')}>
                <button type="button" className={cx('section-dropdown')} onClick={toggleDropdown}>
                    <span>
                        <FontAwesomeIcon icon={faAlignLeft} />
                    </span>
                    <div className={cx('section-dropdown-node', { open: isDropdownOpen })}>
                        <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: '4px' }} />
                    </div>
                </button>
                {isDropdownOpen && (
                    <div className={cx('dropdown-options')}>
                        {control.map((data, index) => {
                            const isActive = changeEditorType?.textAlign?.[data.alignment]?.active || false;

                            return (
                                <div
                                    key={index}
                                    className={cx('dropdown-item', {
                                        active: isActive,
                                    })}
                                    onClick={() => handleChange(data.alignment)}
                                >
                                    <div className={cx('dropdown-item-group')}>
                                        <div className={cx('dropdown-item-icon')}>
                                            <FontAwesomeIcon icon={data.icon} />{' '}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TextAlign;
