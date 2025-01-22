import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    gray = false,
    outline = false,
    rounded = false,
    small = false,
    medium = false,
    large = false,
    text = false,
    disabled = false,
    children,
    onClick,
    leftIcon,
    rightIcon,
    leftIconStyles,
    className,
    ...passProps
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    // REMOVE EVENTLISTENER
    if (disabled) {
        Object.keys(props).forEach((propsKey) => {
            if (propsKey.startsWith('on') && typeof props[propsKey] === 'function') {
                delete props[propsKey];
            }
        });
    }

    // [className]: className, : đây là điều kiện nếu className được truyền trên props thì sẽ lấy value của className
    const classes = cx('wrapper', {
        // .wrapper {} .primary{}
        [className]: className,
        primary,
        gray,
        outline,
        small,
        medium,
        large,
        text,
        disabled,
        rounded,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx({ margin: leftIcon })}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
