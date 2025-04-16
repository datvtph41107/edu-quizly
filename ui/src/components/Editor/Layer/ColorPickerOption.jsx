import React from 'react';
import classNames from 'classnames/bind';
import styles from './ColorPickerOption.module.scss';
import { Utils } from '~/utils/Utils';

const cx = classNames.bind(styles);

function ColorPickerOption({ fn = () => {} }) {
    return (
        <div className={cx('color-dropdown')}>
            <div className={cx('color-option')}>
                {Utils.colorOptions.map((color, index) => (
                    <div
                        key={index}
                        onClick={() => fn(color)}
                        className={cx('color-option-item')}
                        style={{ backgroundColor: color }}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default ColorPickerOption;
