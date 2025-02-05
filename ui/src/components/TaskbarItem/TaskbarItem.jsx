import classNames from 'classnames/bind';
import styles from './TaskbarItem.module.scss';

const cx = classNames.bind(styles);

function TaskbarItem({
    input = false,
    heading = false,
    box = false,
    rotate = false,
    disabled = false,
    leftIcon = false,
    rightIcon = false,
    children,
    onClick,
    className,
    ...passProps
}) {
    let Comp = 'div';

    const props = {
        onClick,
        ...passProps,
    };

    if (input) {
        Comp = 'input';
    }

    // REMOVE EVENTLISTENER
    if (disabled) {
        Object.keys(props).forEach((propsKey) => {
            if (propsKey.startsWith('on') && typeof props[propsKey] === 'function') {
                delete props[propsKey];
            }
        });
    }

    const classes = cx('wrapper', {
        [className]: className,
        heading,
        box,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon', 'left-icon')}>{leftIcon}</span>}
            <span className={cx({ 'box-icon': box, rotate: rotate })}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default TaskbarItem;
