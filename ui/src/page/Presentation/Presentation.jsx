import React from 'react';
import styles from './Presentation.module.scss';
import classNames from 'classnames/bind';
import DraggableElement from '~/components/Dragable';
import useStore from '~/features/store';

const cx = classNames.bind(styles);

function Presentation() {
    const { selectedId, items, updatePositionBlock } = useStore();

    const selectedSlide = items.find((slide) => slide.id === selectedId);
    const elements = selectedSlide ? selectedSlide.elements : [];

    console.log(items);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {elements.map((el) => (
                    <DraggableElement key={el.id} element={el} onUpdate={updatePositionBlock} />
                ))}
            </div>
        </div>
    );
}

export default Presentation;
