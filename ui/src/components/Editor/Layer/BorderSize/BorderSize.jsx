import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './BorderSize.module.scss';
import { Utils } from '~/utils/Utils';
import useStore from '~/features/store';

const cx = classNames.bind(styles);

function BorderSize({ editor }) {
    const { selectedSlideId, selectedElements, updateElementBorderSize } = useStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selected, setSelected] = useState('No Border');

    const toggleDropdown = () => {
        editor?.commands.focus();
        setIsDropdownOpen((prev) => !prev);
    };

    const handleSelect = (value) => {
        updateElementBorderSize({
            slideId: selectedSlideId,
            elementId: selectedElements.element.id,
            borderSize: value,
        });

        setIsDropdownOpen(false);
        setSelected(value);
    };

    return (
        <div style={{ position: 'relative', padding: '10px', marginTop: '5px' }} onClick={toggleDropdown}>
            <div className={cx('box-btn-cs')}>
                <div style={{ height: '0.5px', width: '100%', marginBottom: '2px' }} className={cx('bg-faded')}></div>
                <div style={{ height: '1px', width: '100%', marginBottom: '2px' }} className={cx('bg-faded')}></div>
                <div style={{ height: '1.5px', width: '100%', marginBottom: '2px' }} className={cx('bg-faded')}></div>
                <div style={{ height: '2px', width: '100%', marginBottom: '2px' }} className={cx('bg-faded')}></div>
            </div>

            {isDropdownOpen && (
                <div className={cx('dropdown-list')}>
                    {Utils.BORDER_SIZES.map((size, idx) => {
                        const isSelected = size === selected;
                        const isNoBorder = size === 'No Border';
                        const height = isNoBorder ? '1px' : size;

                        return (
                            <div
                                key={idx}
                                className={cx('dropdown-item', { selected: isSelected })}
                                onClick={() => handleSelect(size)}
                            >
                                <div className={cx('line-preview')} style={{ height }} />
                                {size + 'px'}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default BorderSize;
