import React from 'react';
import { Rnd } from 'react-rnd';
import styles from './Dragable.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faFill, faTrash, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { useEditor } from '@tiptap/react';
import { isActiveTypeState, render, updateEditorState, extensions } from '~/components/ElementTypes/ElementTypes';
import useStore from '~/features/store';
import { useStateContext } from '~/context/ContextProvider';
import { TYPE_SHAPE } from '~/utils/Const';
import './drag.css';

const cx = classNames.bind(styles);

function DraggableElement({
    className = false,
    element,
    selectedElements,
    storeElementBoundingBox,
    calculateElementsInBoundingBox, // pass function calculate selectedElementsInBox
    setBoundingBox,
    getBoundingBox,
    onUpdate,
    onSelect,
    setisDraggingToSelect,
}) {
    const { registerEditor, updateElementHtml, items } = useStore();
    const { setChangeEditorType, changeEditorType } = useStateContext();

    const classes = cx('content', {
        shape: element.tab === TYPE_SHAPE,
        [className]: className,
    });

    const editor = useEditor(
        {
            editable: true,
            extensions: extensions,
            // content: element.placeholder,
            onCreate: ({ editor }) => {
                registerEditor(element.id, editor);
                // setEditorComponents(element.id, editor);
                if (element.type === 'h1') {
                    editor.commands.setHeading({ level: 1 });
                }
            },
            onSelectionUpdate: ({ editor }) => {
                const { $from, $to } = editor.state.selection;
                const start = $from.pos;
                const end = $to.pos;

                if (!editor.isEmpty) {
                    updateEditorState({ editor: editor, setChangeEditorType: setChangeEditorType });
                }
            },
            onUpdate: ({ editor }) => {
                const html = editor.getHTML();

                updateElementHtml({
                    elementId: element.id,
                    html,
                });

                if (editor.isEmpty) {
                    if (element.type === 'h1') {
                        editor.commands.setHeading({ level: 1 });
                    }
                    isActiveTypeState({ editor: editor, changeEditorType: changeEditorType });
                }
            },
        },
        [],
    );

    const handleDrag = (e, d) => {
        setisDraggingToSelect(false);
        if (storeElementBoundingBox.length > 0) {
            storeElementBoundingBox.forEach((el) => {
                if (el.id === Number(d.node.id)) {
                    if (el.transform.position.x !== d.x || el.transform.position.y !== d.y) {
                        const deltaX = d.x - el.transform.position.x;
                        const deltaY = d.y - el.transform.position.y;

                        const updatedElements = storeElementBoundingBox.map((el) => {
                            const updatedX = el.transform.position.x + deltaX;
                            const updatedY = el.transform.position.y + deltaY;

                            onUpdate(el.id, { x: updatedX, y: updatedY });

                            return {
                                ...el,
                                transform: {
                                    ...el.transform,
                                    position: {
                                        x: updatedX,
                                        y: updatedY,
                                    },
                                },
                            };
                        });

                        setBoundingBox(calculateElementsInBoundingBox(updatedElements));
                    } else {
                        return el;
                    }
                }
            });
        } else {
            if (element.transform.position.x !== d.x || element.transform.position.y !== d.y) {
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
            onSelect({ elementData: { element: element, target: parentElement }, only: true }); // get element with id
        }
    };

    const isSelected = storeElementBoundingBox.map((el) => el.id).includes(element.id);
    const isSelectDisplay = selectedElements?.element?.id === element.id;

    // ELEMENT VIEW RENDER
    const renderView = render({
        type: element.type,
        propStyles: {
            id: `element-${element.id}`,
            width: element.transform.size.width,
            height: element.transform.size.height,
            // borderStroke: '',
            // borderColorStroke: '',
            className: classes,
            style: {
                ...(element.type === 'block' ? { backgroundColor: '#018a38' } : {}),
                opacity: editor.isFocused ? 1 : 0,
            },
        },
        props: {
            element: element,
            isSelected: isSelected,
            editor: editor,
        },
        tab: element.tab,
    });

    return (
        <Rnd
            id={element.id}
            onMouseDown={handleOpenDragging}
            className={cx('wrapper', 'elementBox-unique-' + element.id)}
            style={{
                // pointerEvents: !selectedElements.element
                //     ? 'auto'
                //     : selectedElements?.element?.id !== element.id && 'none',
                zIndex: editor?.isFocused || selectedElements?.element?.id === element.id ? 999 : element.zIndex,
                willChange: 'transform',
            }}
            size={{
                width: element.transform.size.width + 2,
                height: element.transform.size.height + 2,
            }}
            position={{ x: element.transform.position.x, y: element.transform.position.y }}
            onDrag={handleDrag}
            onResize={handleResize}
            disableDragging={editor?.isFocused}
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
            {selectedElements?.element?.id === element.id && (
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
            )}

            <div className={cx('slide-element')}>
                <div
                    className={cx('slide-element-border', { active: selectedElements?.element?.id === element.id })}
                ></div>

                {/* <div className={cx('radito-3', { disable: !openDrag })}>
                        <FontAwesomeIcon icon={faRotate} />
                        <div className={cx('radito-stick')}></div>
                    </div> */}

                <div className={cx({ 'shape-element': element.tab === TYPE_SHAPE }, { [element.tab]: element.tab })}>
                    {renderView}
                </div>
            </div>
        </Rnd>
    );
}

export default DraggableElement;
