import React from 'react';
import { Rnd } from 'react-rnd';
import styles from './Dragable.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function DraggableElement({ element, onUpdate }) {
    const handleDrag = (e, d) => {
        onUpdate(element.id, { x: d.x, y: d.y });
    };

    const handleResize = (e, direction, ref, delta, position) => {
        onUpdate(element.id, {
            x: position.x,
            y: position.y,
            width: parseInt(ref.style.width, 10),
            height: parseInt(ref.style.height, 10),
        });
    };

    return (
        <Rnd
            className={cx('element')}
            size={{ width: element.width, height: element.height }}
            position={{ x: element.x, y: element.y }}
            onDrag={handleDrag} // Kéo và cập nhật ngay lập tức
            onResize={handleResize}
            enableResizing={{
                top: true,
                right: true,
                bottom: true,
                left: true,
                topRight: true,
                bottomRight: true,
                bottomLeft: true,
                topLeft: true,
            }}
        >
            <div className={cx('content')}>{element.content}</div>
        </Rnd>
    );
}

export default DraggableElement;
