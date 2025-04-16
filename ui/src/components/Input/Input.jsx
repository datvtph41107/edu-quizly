import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import React from 'react';

const cx = classNames.bind(styles);

const Input = React.forwardRef(
    ({ label, name, classes, classNameLabel, type = 'input', placeholder = '', ...rest }, ref) => {
        return (
            <div className={cx('wrapper')}>
                <label htmlFor={name} className={classNameLabel}>
                    {label}
                </label>
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    className={classes}
                    ref={ref}
                    {...rest}
                />
            </div>
        );
    },
);

export default Input;
