import React, { useState, useRef, useEffect } from 'react';
import styles from './Presentation.module.scss';
import classNames from 'classnames/bind';
import useStore from '~/features/store';
import DraggableElement from '~/components/Dragable';
import DraggableView from '~/components/Dragable/DragableView';
import { useEditor } from '@tiptap/react';
import { extensions, isActiveTypeState, updateEditorState } from '~/components/ElementTypes/ElementTypes';

const cx = classNames.bind(styles);

function Presentation() {
    const { selectedSlideId, selectedElements, updatePositionBlock, onSelect, items, editorComponents } = useStore();
    const [isDraggingToSelect, setisDraggingToSelect] = useState(false);
    const [selectedTemp, setSelectedTemp] = useState([]); // store element selected temp
    const [selectionBox, setSelectionBox] = useState(null);
    const [boundingBox, setBoundingBox] = useState(null);
    // const [editors, setEditors] = useState([]);
    const wrapperRef = useRef(null);
    const containerRef = useRef(null);

    const selectedSlide = items.find((slide) => slide.id === selectedSlideId);
    const elements = selectedSlide ? selectedSlide.elements : []; // Find all of elemenst in slide selected

    const handleMouseDown = (e) => {
        // Handle bounding select box
        if (e.button !== 0) return;
        const targetElement = e.target;
        console.log(targetElement);

        if (
            (!isDraggingToSelect && (targetElement.id === 'display-element' || targetElement.id === 'boundingBox')) ||
            targetElement.id === 'contentText' ||
            targetElement.id === 'shape'
        ) {
            setSelectedTemp([]);
            setBoundingBox(null);
        }

        if (targetElement.id === 'display-element' && !selectedElements?.element?.id) {
            console.log('when i touch start pull');
            const rect = containerRef.current.getBoundingClientRect();

            setSelectionBox({
                startX: e.clientX - rect.left,
                startY: e.clientY - rect.top,
                width: 0,
                height: 0,
            });
            setisDraggingToSelect(true);
        }
        // if bouding wrapper not pull move mouse
        if (
            targetElement.id === 'display-element' ||
            (targetElement.id === 'wrapper' && selectedElements?.element?.id)
        ) {
            // setEditorMoute(false);
            onSelect({ elementData: [], only: true }); // when selected element only
        }
    };

    // Draging pull mouse move bounding select
    const handleMouseMove = (e) => {
        console.log('when i pull mouse to');
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
            const elementX = element.transform.position.x;
            const elementY = element.transform.position.y;
            const elementRight = elementX + element.transform.size.width;
            const elementBottom = elementY + element.transform.size.height;
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
            minX = Math.min(minX, el.transform.position.x);
            minY = Math.min(minY, el.transform.position.y);
            maxX = Math.max(maxX, el.transform.position.x + el.transform.size.width);
            // cộng width vì ví dụ tỷ lệ kéo chuột sẽ từ trái xuống dưỡi bên phải sẽ ra một hình vuông
            // => el.x là phần tử từ lúc đặt kéo chuột witdth là tính điểm cuối cùng thả ra
            maxY = Math.max(maxY, el.transform.position.y + el.transform.size.height);
        });

        return {
            startX: coordinate ? coordinate.transform.position.x : minX,
            startY: coordinate ? coordinate.transform.position.y : minY,
            width: maxX - minX,
            height: maxY - minY,
        };
    };

    const handleMouseUp = () => {
        // console.log('when i throw');
        // console.log(selectedTemp);

        selectedTemp.forEach((el) => onSelect({ elementData: el.id }));
        setisDraggingToSelect(false);
        setSelectionBox(null);
    };

    useEffect(() => {
        if (isDraggingToSelect && wrapperRef.current) {
            wrapperRef.current.addEventListener('mousemove', handleMouseMove);
            wrapperRef.current.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            if (wrapperRef.current) {
                wrapperRef.current.removeEventListener('mousemove', handleMouseMove);
                wrapperRef.current.removeEventListener('mouseup', handleMouseUp);
            }
        };
    }, [isDraggingToSelect]);

    // const editors = elements.map((element, index) => {
    //     return {
    //         elementId: element.id,
    //         editor: useEditor(
    //             {
    //                 editable: true,
    //                 extensions: extensions,
    //                 content: element.placeholder,
    //                 onCreate: ({ editor }) => {
    //                     // setEditorComponents(element.id, editor);
    //                     // setEditorComponents(element.id, editor);
    //                     if (element.type === 'h1') {
    //                         editor.commands.setHeading({ level: 1 });
    //                     }
    //                 },
    //                 onSelectionUpdate: ({ editor }) => {
    //                     const { $from, $to } = editor.state.selection;
    //                     const start = $from.pos;
    //                     const end = $to.pos;

    //                     if (!editor.isEmpty) {
    //                         updateEditorState({ editor: editor, setChangeEditorType: setChangeEditorType });
    //                     }
    //                 },
    //                 onUpdate: ({ editor }) => {
    //                     const editorContent = editor.getHTML();

    //                     if (editor.isEmpty) {
    //                         if (element.type === 'h1') {
    //                             editor.commands.setHeading({ level: 1 });
    //                         }
    //                         isActiveTypeState({ editor: editor, changeEditorType: changeEditorType });
    //                     }
    //                 },
    //                 onBlur: (e) => {
    //                     setIsEditing(false);
    //                 },
    //             },
    //             [element.data.html, element],
    //         ),
    //     };
    // });
    // console.log(editors);

    return (
        // ON MOUSE DOWN
        <div
            ref={wrapperRef}
            onMouseDown={handleMouseDown}
            id="wrapper"
            className={cx('wrapper')}
            style={{ position: 'relative', minHeight: '500px' }}
        >
            <div id="container" className={cx('container')} ref={containerRef}>
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
                <div id="display-element" className={cx('display-element')}>
                    {elements.map((el, index) => (
                        <DraggableView
                            key={index}
                            element={el}
                            // editor={editors.find((editor) => editor.elementId === el.id)?.editor}
                            selectedElements={selectedElements}
                            storeElementBoundingBox={selectedTemp} // Store bounding select (check to use handledrag)
                            calculateElementsInBoundingBox={getBoundingBox}
                            setBoundingBox={setBoundingBox}
                            getBoundingBox={boundingBox}
                            onUpdate={updatePositionBlock} // update position drag
                            onSelect={onSelect} // Get select element fn
                            isDraggingToSelect={isDraggingToSelect}
                            setisDraggingToSelect={setisDraggingToSelect}
                        />
                    ))}
                </div>
                {elements.map((el, index) => (
                    <DraggableElement
                        key={index}
                        element={el}
                        // editor={editors.find((editor) => editor.elementId === el.id)?.editor}
                        selectedElements={selectedElements}
                        storeElementBoundingBox={selectedTemp} // Store bounding select (check to use handledrag)
                        calculateElementsInBoundingBox={getBoundingBox}
                        setBoundingBox={setBoundingBox}
                        getBoundingBox={boundingBox}
                        onUpdate={updatePositionBlock} // update position drag
                        onSelect={onSelect} // Get select element fn
                        isDraggingToSelect={isDraggingToSelect}
                        setisDraggingToSelect={setisDraggingToSelect}
                    />
                ))}
            </div>
        </div>
    );
}

export default Presentation;
