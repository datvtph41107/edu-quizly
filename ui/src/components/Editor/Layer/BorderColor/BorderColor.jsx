import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './BorderColor.module.scss';
import useStore from '~/features/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import ColorPickerOption from '../ColorPickerOption';
import { useStateContext } from '~/context/ContextProvider';

const cx = classNames.bind(styles);

function BorderColor({ editor }) {
    const { selectedSlideId, selectedElements, updateElementBorderColor } = useStore();
    const { borderColorSetting, setBorderColorSetting } = useStateContext();

    const toggleDropdown = () => {
        setBorderColorSetting((prev) => !prev);
    };

    const handleSelect = (color) => {
        if (!selectedElements?.element?.id) return;
        updateElementBorderColor({
            slideId: selectedSlideId,
            elementId: selectedElements.element.id,
            borderColor: color,
        });
        setBorderColorSetting(false);
    };

    return (
        <div style={{ position: 'relative' }}>
            <button className={cx('box-btn')} onClick={toggleDropdown}>
                <div
                    style={{
                        boxShadow: '0px -2px 0px inset',
                        color:
                            selectedElements.element.borderColor !== ''
                                ? selectedElements.element.borderColor
                                : 'black',
                    }}
                    className={cx('box-btn-grap')}
                >
                    <FontAwesomeIcon icon={faPen} className={cx('box-icc')} />
                </div>
            </button>
            {borderColorSetting && <ColorPickerOption fn={handleSelect} />}
        </div>
    );
}

export default BorderColor;
