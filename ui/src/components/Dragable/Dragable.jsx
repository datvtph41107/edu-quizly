import React, { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import styles from './Dragable.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faFill, faRotate, faTrash, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { useStateContext } from '~/context/ContextProvider';
import { useEditor } from '@tiptap/react';
import { isActiveTypeState, render, updateEditorState, extensions } from '~/components/ElementTypes/ElementTypes';
import './drag.css';

const cx = classNames.bind(styles);

function DraggableElement({
    className = false,
    element,
    selectedElements,
    getElementIdSelected,
    setSelectElementId,
    storeElementBoundingBox,
    calculateElementsInBoundingBox, // pass function calculate selectedElementsInBox
    setBoundingBox,
    getBoundingBox,
    onUpdate,
    onSelect,
    isDraggingToSelect,
    setisDraggingToSelect,
}) {
    const { setEditorMoute, setEditor, setChangeEditorType, changeEditorType } = useStateContext();
    const [isEditing, setIsEditing] = useState(false);
    const [openDrag, setOpenDrag] = useState(false);
    const classes = cx('content', {
        shape: element.tab === 'shape',
        [className]: className,
    });

    const editor = useEditor(
        {
            editable: true,
            extensions: extensions,
            content: element.textPreview,
            onSelectionUpdate: ({ editor }) => {
                const { $from, $to } = editor.state.selection;

                const start = $from.pos;
                const end = $to.pos;
                if (!editor.isEmpty) {
                    updateEditorState({ editor: editor, setChangeEditorType: setChangeEditorType });
                }
            },
            onUpdate: ({ editor }) => {
                const editorContent = editor.getHTML();

                if (editor.isEmpty) {
                    isActiveTypeState({ editor: editor, changeEditorType: changeEditorType });
                }
            },
            onBlur: (e) => {
                setIsEditing(false);
            },
        },
        [element.content],
    );

    const handleDrag = (e, d) => {
        setisDraggingToSelect(false);
        if (storeElementBoundingBox.length > 0) {
            setOpenDrag(false);
            storeElementBoundingBox.forEach((el) => {
                if (el.id === Number(d.node.id)) {
                    if (el.x !== d.x || el.y !== d.y) {
                        const deltaX = d.x - el.x;
                        const deltaY = d.y - el.y;

                        const updatedElements = storeElementBoundingBox.map((el) => {
                            const updatedX = el.x + deltaX;
                            const updatedY = el.y + deltaY;

                            onUpdate(el.id, { x: updatedX, y: updatedY });

                            return {
                                ...el,
                                x: updatedX,
                                y: updatedY,
                            };
                        });

                        setBoundingBox(calculateElementsInBoundingBox(updatedElements));
                    } else {
                        return el;
                    }
                }
            });
        } else {
            if (element.x !== d.x || element.y !== d.y) {
                onUpdate(element.id, { x: d.x, y: d.y });
            }
        }
    };

    const handleResize = (e, direction, ref, delta, position) => {
        onUpdate(element.id, {
            x: position.x,
            y: position.y,
            width: parseInt(ref.style.width, 10),
            height: parseInt(ref.style.height, 10),
        });
    };

    // open options
    const handleOpenDragging = (e) => {
        const parentElement = e.target.closest('.elementBox-unique-' + element.id);
        if (!getBoundingBox) {
            setEditor(editor); // set state editor to get menu header
            onSelect({ elementData: { element: element, target: parentElement }, only: true }); // get element with id
            setEditorMoute(true); // open setting navbar left
        }
    };

    const isSelected = storeElementBoundingBox.map((el) => el.id).includes(element.id);
    const isSelectDisplay = selectedElements?.element?.id === element.id;
    // ELEMENT VIEW RENDER
    const renderView = render({
        type: element.type,
        propStyles: {
            id: `element-${element.id}`,
            width: element.width,
            height: element.height,
            // borderStroke: '',
            // borderColorStroke: '',
            className: classes,
            style: {
                ...(element.type === 'block' ? { backgroundColor: '#018a38' } : {}),
                // zIndex: element.index,
            },
        },
        props: {
            element: element,
            isSelected: isSelected,
            setIsEditing: setIsEditing,
            editor: editor,
            changeEditorType: changeEditorType,
            selectedElements: selectedElements,
        },
        tab: element.tab,
    });

    return (
        <Rnd
            id={element.id}
            onMouseDown={handleOpenDragging}
            className={cx(
                'wrapper',
                { disable: isSelectDisplay },
                { dragging: !isDraggingToSelect },
                { selected: isSelected },
                'elementBox-unique-' + element.id,
            )}
            style={{
                // pointerEvents: !selectedElements.element
                //     ? 'auto'
                //     : selectedElements?.element?.id !== element.id && 'none',
                zIndex: (isEditing || selectedElements?.element?.id === element.id) && 999,
                willChange: 'transform',
            }}
            size={{ width: element.width, height: element.height }}
            position={{ x: element.x, y: element.y }}
            onDrag={handleDrag}
            onResize={handleResize}
            disableDragging={isEditing}
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
            resizeHandleClasses={{
                topLeft: 'node-1 ' + (!isSelectDisplay && 'disable'),
                topRight: 'node-2 ' + (!isSelectDisplay && 'disable'),
                bottomLeft: 'node-3 ' + (!isSelectDisplay && 'disable'),
                bottomRight: 'node-4 ' + (!isSelectDisplay && 'disable'),
                top: 'node-5 ' + (!isSelectDisplay && 'disable'),
                bottom: 'node-6 ' + (!isSelectDisplay && 'disable'),
                left: 'node-7 ' + (!isSelectDisplay && 'disable'),
                right: 'node-8 ' + (!isSelectDisplay && 'disable'),
            }}
            minWidth={40}
            minHeight={element.type !== 'line' ? 40 : 5}
            maxHeight={element.type === 'line' ? 16 : undefined}
            dragGrid={[5, 5]}
        >
            <div className={cx('nav-contain', { disable: !isSelectDisplay })}>
                <div>
                    <div className={cx('nav-main')}>
                        <button className={cx('nav-main-btn')}>
                            <FontAwesomeIcon className={cx('nav-main-btn-icon')} icon={faFill} />
                        </button>
                        <button className={cx('nav-main-btn')}>
                            <FontAwesomeIcon className={cx('nav-main-btn-icon')} icon={faCopy} />
                        </button>
                        <button className={cx('nav-main-btn')}>
                            <FontAwesomeIcon className={cx('nav-main-btn-icon')} icon={faUnlock} />
                        </button>
                        <button className={cx('nav-main-btn')}>
                            <FontAwesomeIcon className={cx('nav-main-btn-icon')} icon={faTrash} />
                        </button>
                    </div>
                </div>
            </div>

            <div className={cx('slide-element')}>
                <div className={cx('slide-element-border')}></div>
                <div className={cx('slide-element-border')}></div>

                <div className={cx('radito-3', { disable: !openDrag })}>
                    <FontAwesomeIcon icon={faRotate} />
                    <div className={cx('radito-stick')}></div>
                </div>

                <div className={cx('shape-element', { [element.tab]: element.tab })}>{renderView}</div>
            </div>
        </Rnd>
    );
}

export default DraggableElement;
