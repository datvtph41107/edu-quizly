import React, { useState, useRef, useEffect } from 'react';
import styles from './Presentation.module.scss';
import classNames from 'classnames/bind';
import useStore from '~/features/store';
import DraggableElement from '~/components/Dragable';

const cx = classNames.bind(styles);

function Presentation() {
    const { selectedId, items, updatePositionBlock, onSelect } = useStore();
    const [isDraggingToSelect, setisDraggingToSelect] = useState(false);
    const [selectionBox, setSelectionBox] = useState(null);
    const [boundingBox, setBoundingBox] = useState(null);
    const [selectedTemp, setSelectedTemp] = useState([]);
    const containerRef = useRef(null);
    const boudingRef = useRef(null);

    console.log(boudingRef);

    const selectedSlide = items.find((slide) => slide.id === selectedId);
    const elements = selectedSlide ? selectedSlide.elements : [];

    const handleMouseDown = (e) => {
        if (e.button !== 0) return;
        const targetElement = e.target;

        if (
            (!isDraggingToSelect && (targetElement.id === 'container' || targetElement.id === 'boundingBox')) ||
            targetElement.id === 'contentText' ||
            targetElement.id === 'shape'
        ) {
            // onSelect(null, true);
            setSelectedTemp([]);
            setBoundingBox(null);
        }
        if (targetElement.id === 'container') {
            const rect = containerRef.current.getBoundingClientRect();

            setSelectionBox({
                startX: e.clientX - rect.left,
                startY: e.clientY - rect.top,
                width: 0,
                height: 0,
            });
            setisDraggingToSelect(true);
        }
    };

    const handleMouseMove = (e) => {
        if (!isDraggingToSelect) return;

        const rect = containerRef.current.getBoundingClientRect();
        let newWidth = e.clientX - rect.left - selectionBox.startX;
        let newHeight = e.clientY - rect.top - selectionBox.startY;
        let startX = selectionBox.startX;
        let startY = selectionBox.startY;
        if (newWidth < 0) {
            newWidth = Math.abs(newWidth);
            startX = e.clientX - rect.left;
        }
        if (newHeight < 0) {
            newHeight = Math.abs(newHeight);
            startY = e.clientY - rect.top;
        }

        setSelectionBox((prev) => ({
            ...prev,
            width: newWidth,
            height: newHeight,
            startX,
            startY,
        }));

        const selectedElementsInBox = elements.filter((element) => {
            const elementX = element.x;
            const elementY = element.y;
            const elementRight = elementX + element.width;
            const elementBottom = elementY + element.height;
            const withinX =
                elementRight >= Math.min(startX, startX + newWidth) && elementX <= Math.max(startX, startX + newWidth);
            const withinY =
                elementBottom >= Math.min(startY, startY + newHeight) &&
                elementY <= Math.max(startY, startY + newHeight);
            return withinX && withinY;
        });
        if (selectedElementsInBox.length > 0) {
            setSelectedTemp(selectedElementsInBox);
            setBoundingBox(getBoundingBox(selectedElementsInBox));
        }
    };

    const getBoundingBox = (selectedElementsInBox = [], coordinate = null) => {
        let minX = Infinity,
            minY = Infinity,
            maxX = -Infinity,
            maxY = -Infinity;

        selectedElementsInBox.forEach((el) => {
            minX = Math.min(minX, el.x);
            minY = Math.min(minY, el.y);
            maxX = Math.max(maxX, el.x + el.width);
            // cộng width vì ví dụ tỷ lệ kéo chuột sẽ từ trái xuống dưỡi bên phải sẽ ra một hình vuông
            // => el.x là phần tử từ lúc đặt kéo chuột witdth là tính điểm cuối cùng thả ra
            maxY = Math.max(maxY, el.y + el.height);
        });

        return {
            startX: coordinate ? coordinate.x : minX,
            startY: coordinate ? coordinate.y : minY,
            width: maxX - minX,
            height: maxY - minY,
        };
    };

    const handleMouseUp = () => {
        selectedTemp.forEach((el) => onSelect(el.id));
        setisDraggingToSelect(false);
        setSelectionBox(null);
    };

    useEffect(() => {
        if (isDraggingToSelect) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDraggingToSelect]);

    return (
        <div id="wrapper" className={cx('wrapper')} style={{ position: 'relative', minHeight: '500px' }}>
            <div id="container" className={cx('container')} ref={containerRef} onMouseDown={handleMouseDown}>
                {isDraggingToSelect && selectionBox && (
                    <div
                        style={{
                            position: 'absolute',
                            left: selectionBox.startX,
                            top: selectionBox.startY,
                            width: selectionBox.width,
                            height: selectionBox.height,
                            border: '1px dashed black',
                            backgroundColor: 'rgba(0, 0, 255, 0.1)',
                            zIndex: 999999,
                        }}
                    />
                )}
                {boundingBox && (
                    <div
                        ref={boudingRef}
                        id="boundingBox"
                        style={{
                            position: 'absolute',
                            left: boundingBox.startX,
                            top: boundingBox.startY,
                            width: boundingBox.width,
                            height: boundingBox.height,
                            border: '1px solid #aaa',
                            boxShadow: 'inset 0 0 0 3px #eca766',
                        }}
                    />
                )}
                {elements.map((el) => (
                    <DraggableElement
                        key={el.id}
                        element={el}
                        type={el.type}
                        onUpdate={updatePositionBlock}
                        selectedElementsState={selectedTemp}
                        onSelect={onSelect}
                        isDraggingToSelect={isDraggingToSelect}
                        setisDraggingToSelect={setisDraggingToSelect}
                        // containerRef={containerRef}
                        getBoundingBox={getBoundingBox}
                        setBoundingBox={setBoundingBox}
                    />
                ))}
            </div>
        </div>
    );
}

export default Presentation;
