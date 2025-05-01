import React from 'react';
import classNames from 'classnames/bind';
import styles from './ColorPickerOption.module.scss';
import { Utils } from '~/utils/Utils';
import { TAB_QUESTION } from '~/utils/Const';

const cx = classNames.bind(styles);

function ColorPickerOption({ fn = () => {}, tab }) {
    const colorList = tab === TAB_QUESTION ? Utils.COLOR_QUESTION_OPTIONS : Utils.COLOR_OPTIONS;

    return (
        <div className={cx('color-dropdown')}>
            <div className={cx('color-option')}>
                {colorList.map((color, index) => (
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
