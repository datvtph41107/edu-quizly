import { createPopper } from '@popperjs/core';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

function Popper({
    children,
    content,
    show,
    placement = 'top',
    offset = [0, -2],
    className,
    classNameArrow,
    color = '#f44336',
    valid,
}) {
    const triggerRef = useRef(null);
    const popperRef = useRef(null);
    const arrowRef = useRef(null);

    const classes = cx('wrapper', className, { valid });
    const arrowClasses = cx('arrow', classNameArrow);

    useEffect(() => {
        if (triggerRef.current && popperRef.current && show) {
            createPopper(triggerRef.current, popperRef.current, {
                placement,
                modifiers: [
                    { name: 'offset', options: { offset } },
                    { name: 'arrow', options: { element: arrowRef.current } },
                    { name: 'preventOverflow', options: { padding: 8 } },
                ],
            });
        }
    }, [show, placement, offset]);

    return (
        <>
            <div ref={triggerRef} style={{ display: 'inline-block', position: 'relative' }}>
                {children}
            </div>
            {show &&
                createPortal(
                    <div
                        ref={popperRef}
                        className={classes}
                        role="tooltip"
                        style={{ '--arrow-color': color }}
                        data-popper-placement={placement}
                    >
                        {content}
                        <div ref={arrowRef} className={arrowClasses} data-popper-arrow />
                    </div>,
                    document.body,
                )}
        </>
    );
}

export default Popper;
