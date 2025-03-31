import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import styles from './Dragable.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faFill, faRotate, faTrash, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { useStateContext } from '~/context/ContextProvider';
import './drag.css';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { render } from '../ElementTypes/ElementTypes';

const cx = classNames.bind(styles);

function DraggableElement({
    className = false,
    element,
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
    const { editorMoute, setEditorMoute, setEditors } = useStateContext();
    const [isEditing, setIsEditing] = useState(false);
    const [openDrag, setOpenDrag] = useState(false);

    const classes = cx('content', {
        shape: element.tab === 'shape',
        [className]: className,
    });

    const editor = useEditor(
        {
            // autofocus: true,
            editable: true,
            extensions: [StarterKit],
            content: element.textPreview,
            onUpdate: ({ editor }) => {
                const editorContent = editor.getHTML();
                console.log(editorContent);
            },
            onBlur: () => {
                setIsEditing(false);
                if (editor.isEmpty) {
                    editor.commands.setContent(element.textPreview);
                }
                console.log('Editor lost focus');
            },
        },
        [element.content],
    );

    useEffect(() => {
        return () => {
            editor?.destroy();
        };
    }, [editor]);

    const handleDrag = (e, d) => {
        // if (!editorMoute) {
        // }
        // setEditorMoute(true);
        // setOpenDrag(true);
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
            // open setting

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
    const handleOpenDragging = () => {
        // storeElementBoundingBox([]);
        // editor.commands.focus();
        if (!getBoundingBox) {
            // const editor = getEditorById(element.id);
            // setEditorContext(editor);
            if (!editorMoute) {
                setEditorMoute(true);
            }
            setEditors(editor); // set state editor to get menu header
            onSelect(element.id); // get element with id
            setSelectElementId(element.id); // get id of element
            setEditorMoute(true); // open setting navbar left
        }
    };

    const isSelected = storeElementBoundingBox.map((el) => el.id).includes(element.id);
    const isSelectDisplay = getElementIdSelected === element.id;
    // ELEMENT VIEW RENDER
    const renderView = render({
        type: element.type,
        propStyles: {
            id: `element-${element.id}`,
            width: element.width,
            height: element.height,
            className: classes,
            style: element.type === 'block' ? { backgroundColor: '#018a38' } : {},
        },
        props: {
            element: element,
            isSelected: isSelected,
            setIsEditing: setIsEditing,
            isEditing: isEditing,
            editor: editor,
        },
        tab: element.tab,
    });

    return (
        <Rnd
            id={element.id}
            className={cx(
                'wrapper',
                { disable: isSelectDisplay },
                { dragging: !isDraggingToSelect },
                { selected: isSelected },
            )}
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

            <div className={cx('slide-element')} onMouseDown={handleOpenDragging}>
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
