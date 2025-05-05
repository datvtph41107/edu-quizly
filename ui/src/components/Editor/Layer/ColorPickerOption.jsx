import React from 'react';
import classNames from 'classnames/bind';
import styles from './ColorPickerOption.module.scss';
import { Utils } from '~/utils/Utils';
import { TAB_QUESTION } from '~/utils/Const';

const cx = classNames.bind(styles);

function ColorPickerOption({ fn = () => {}, tab }) {
    return (
        <div className={cx('color-dropdown')}>
            {!tab === TAB_QUESTION ? (
                <div className={cx('color-option')}>
                    {Utils.COLOR_OPTIONS.map((color, index) => (
                        <div
                            key={index}
                            onClick={() => fn(color)}
                            className={cx('color-option-item')}
                            style={{ backgroundColor: color }}
                        ></div>
                    ))}
                </div>
            ) : (
                <div className={cx('color-option-qa')}>
                    {Utils.COLOR_QUESTION_OPTIONS.map((color, index) => (
                        <div
                            key={index}
                            onClick={() => fn(color)}
                            className={cx('color-option-item-qa')}
                            style={{ backgroundColor: color }}
                        ></div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ColorPickerOption;
