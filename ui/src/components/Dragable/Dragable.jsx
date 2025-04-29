import React, { useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import styles from './Dragable.module.scss';
import classNames from 'classnames/bind';
import { Rnd } from 'react-rnd';
import { useEditor } from '@tiptap/react';
import { useStateContext } from '~/context/ContextProvider';
import useStore from '~/features/store';
import { useDebounce } from '~/hooks';
import {
    isActiveTypeState,
    render,
    renderView,
    updateEditorState,
    extensions,
} from '~/components/ElementTypes/ElementTypes';
import {
    TYPE_SHAPE,
    TYPE_SHAPE_ARROW,
    TYPE_SHAPE_LINE,
    TYPE_TABLE,
    TYPE_TEXT_BODY,
    TYPE_TEXT_HEADING,
    TYPE_TEXT_LIST_NUMBER,
    TYPE_TEXT_LIST_UL,
    TYPE_TEXT_TAG,
} from '~/utils/Const';
import { faCopy, faFill, faLock, faTrash, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './drag.css';
import {
    createCustomTable,
    defaultHeadingContent,
    defaultParagraph,
    defaultParagraphBody,
    createList,
} from '~/utils/Utils';

const cx = classNames.bind(styles);

function DraggableElement({
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
    const { registerEditor, updateElementHtml, updateElementSize, removeElement, updateElementLock, duplicateElement } =
        useStore();
    const { setChangeEditorType, changeEditorType, setFillSetting, setBorderColorSetting } = useStateContext();
    const [htmlValue, setHtmlValue] = useState('');

    const isSelectDisplay = selectedElements?.element?.id === element.id;

    const editor = useEditor(
        {
            editable: true,
            extensions: extensions,
            // content: element.placeholder,
            onCreate: ({ editor }) => {
                registerEditor(element.id, editor);
                if (element.type === TYPE_TABLE) {
                    const customTableNode = createCustomTable(element.placeholder, element.placeholderSize);
                    editor.commands.setContent({ type: 'doc', content: [customTableNode] });
                    updateElementHtml({
                        elementId: element.id,
                        html: editor.getHTML(),
                    });
                }

                if (element.tab === TYPE_SHAPE) {
                    editor.commands.setContent({ type: 'doc', content: [defaultParagraph] });
                    editor.commands.setTextAlign('center');
                }

                if (element.tab === TYPE_TEXT_BODY) {
                    editor.commands.setContent({
                        type: 'doc',
                        content: [defaultParagraphBody],
                    });
                    editor.commands.setTextAlign('left');
                }

                if (element.type === TYPE_TEXT_LIST_UL) {
                    const bulletListNode = createList(3, TYPE_TEXT_LIST_UL);
                    editor.commands.setContent({
                        type: 'doc',
                        content: [bulletListNode],
                    });
                    editor.commands.setTextAlign('left');
                }

                if (element.type === TYPE_TEXT_LIST_NUMBER) {
                    const bulletListNode = createList(3, TYPE_TEXT_LIST_NUMBER);
                    editor.commands.setContent({
                        type: 'doc',
                        content: [bulletListNode],
                    });
                    editor.commands.setTextAlign('left');
                }

                if (element.tab === TYPE_TEXT_HEADING) {
                    editor.commands.setContent({
                        type: 'doc',
                        content: [defaultHeadingContent],
                    });
                    editor.commands.setTextAlign('left');
                }
                onSelect({ elementData: { element: element, target: null }, only: true });
            },
            onSelectionUpdate: ({ editor }) => {
                if (editor.isEmpty && element.tab === TYPE_SHAPE) {
                    editor.commands.setTextAlign('left');
                }

                if (!editor.isEmpty) {
                    updateEditorState({ editor: editor, setChangeEditorType: setChangeEditorType });
                }
            },
            onUpdate: ({ editor }) => {
                const html = editor.getHTML();
                setHtmlValue(html);

                if (editor.isEmpty) {
                    isActiveTypeState({ editor, changeEditorType });
                }
            },
        },
        [],
    );

    const debouncedHTML = useDebounce(htmlValue, 3000);

    useEffect(() => {
        if (!editor || !debouncedHTML) return;

        const htmlString = renderToStaticMarkup(
            renderView({
                type: element.type,
                propStyles: {
                    id: `element-${element.id}`,
                    width: element.transform.size.width,
                    height: element.transform.size.height,
                    borderStroke: element.borderSize === '' ? '0' : element.borderSize,
                    borderColorStroke: element.borderColor === '' ? '#429a50' : element.borderColor,
                    fillColor: element.backgroundColor === '' ? '#429a50' : element.backgroundColor,
                    style: {
                        overflow: 'visible',
                        verticalAlign: 'middle',
                        display: 'block',
                        ...(element.type === 'block' ? { backgroundColor: '#018a38' } : {}),
                    },
                },
                props: {
                    element: element,
                    editor: editor,
                },
                tab: element.tab,
            }),
        );

        updateElementHtml({
            elementId: element.id,
            html: htmlString,
        });
    }, [debouncedHTML]);

    useEffect(() => {
        if (!editor) return;

        const handleBeforeInput = () => {
            const { commands } = editor;

            if (!editor.isActive('textStyle') && element.type !== TYPE_TEXT_HEADING) {
                commands.setMark('textStyle', { fontSize: 16, lineHeight: '1.5em' });
            }
        };

        const view = editor.view;
        view.dom.addEventListener('beforeinput', handleBeforeInput);
        return () => {
            view.dom.removeEventListener('beforeinput', handleBeforeInput);
        };
    }, [editor]);

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
        onUpdate(
            element.id,
            {
                x: position.x,
                y: position.y,
            },
            {
                width: parseFloat(ref.style.width),
                height: parseFloat(ref.style.height),
            },
        );
    };

    // open options
    const handleOpenDragging = (e) => {
        const parentElement = e.target.closest('.elementBox-unique-' + element.id);

        if (!getBoundingBox) {
            onSelect({ elementData: { element: element, target: parentElement }, only: true }); // get element with id
        }
    };

    const handleContentResize = (size) => {
        if (element.type !== TYPE_TEXT_TAG) return;

        const { width: newWidth, height: newHeight } = size;
        const { width: oldWidth, height: oldHeight } = element.transform.size;

        const widthTerm = 20.23076923076923;
        const BUFFER = 24;
        const length = editor.getText().trim().length - 1;
        // let flag = 1;

        // console.log('length', length);
        // console.log('new', widthTerm * length + BUFFER);
        // console.log('old', oldWidth);
        // console.log('new height', newHeight);
        // console.log(oldHeight);

        const shouldUpdate = widthTerm * length + BUFFER > oldWidth;

        if (shouldUpdate) {
            // flag += 1;

            updateElementSize({
                elementId: element.id,
                size: {
                    width: Math.max(newWidth + BUFFER, oldWidth),
                    height: newHeight + BUFFER,
                },
            });
        }
    };

    const handleRemoveElement = () => {
        removeElement(element.id);
    };

    const handleLockElement = (bol) => {
        updateElementLock(element.id, bol);
    };

    const handleCPel = () => {
        duplicateElement(element.id);
    };

    const handleFillColor = () => {
        setFillSetting(true);
    };

    const handleBorderColor = () => {
        setBorderColorSetting(true);
    };

    // ELEMENT VIEW RENDER
    const renderElementDrag = render({
        type: element.type,
        propStyles: {
            id: `element-${element.id}`,
            width: element.transform.size.width,
            height: element.transform.size.height,
            borderStroke: element.borderSize === '' ? '0' : element.borderSize,
            borderColorStroke: element.borderColor === '' ? '#429a50' : element.borderColor,
            fillColor: element.backgroundColor === '' ? '#429a50' : element.backgroundColor,
            style: {
                overflow: 'visible',
                verticalAlign: 'middle',
                display: 'block',
                ...(element.type === 'block' ? { backgroundColor: '#018a38' } : {}),
                opacity: editor.isFocused ? 1 : 0,
            },
        },
        props: {
            element: element,
            editor: editor,
            onResizeContent: handleContentResize,
        },
        tab: element.tab,
    });

    return (
        <Rnd
            id={element.id}
            onMouseDown={handleOpenDragging}
            className={cx('wrapper', 'elementBox-unique-' + element.id)}
            style={{
                zIndex: editor?.isFocused || selectedElements?.element?.id === element.id ? 999 : element.zIndex,
                willChange: 'transform',
            }}
            size={{
                width: element.transform.size.width,
                height: element.transform.size.height,
            }}
            position={{ x: element.transform.position.x, y: element.transform.position.y }}
            onDrag={handleDrag}
            onResize={handleResize}
            disableDragging={editor?.isFocused || element.lock}
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
                topLeft: 'node-1 ' + ((!isSelectDisplay || element.lock) && 'disable'),
                topRight: 'node-2 ' + ((!isSelectDisplay || element.lock) && 'disable'),
                bottomLeft: 'node-3 ' + ((!isSelectDisplay || element.lock) && 'disable'),
                bottomRight: 'node-4 ' + ((!isSelectDisplay || element.lock) && 'disable'),
                top: 'node-5 ' + ((!isSelectDisplay || element.lock) && 'disable'),
                bottom: 'node-6 ' + ((!isSelectDisplay || element.lock) && 'disable'),
                left: 'node-7 ' + ((!isSelectDisplay || element.lock) && 'disable'),
                right: 'node-8 ' + ((!isSelectDisplay || element.lock) && 'disable'),
            }}
            minWidth={40}
            minHeight={element.type !== TYPE_SHAPE_LINE ? 40 : 5}
            maxHeight={element.type === TYPE_SHAPE_LINE ? 16 : undefined}
            dragGrid={[5, 5]}
        >
            {element.lock ? (
                <div className={cx('nav-contain')}>
                    <div>
                        <div className={cx('nav-main')}>
                            <button className={cx('nav-main-btn')} onClick={() => handleLockElement(false)}>
                                <FontAwesomeIcon className={cx('nav-main-btn-icon')} icon={faLock} />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                selectedElements?.element?.id === element.id && (
                    <div className={cx('nav-contain', { disable: !isSelectDisplay })}>
                        <div>
                            <div className={cx('nav-main')}>
                                {element.tab === TYPE_SHAPE && (
                                    <button
                                        className={cx('nav-main-btn')}
                                        onClick={
                                            element.type !== TYPE_SHAPE_LINE && element.type !== TYPE_SHAPE_ARROW
                                                ? handleFillColor
                                                : handleBorderColor
                                        }
                                    >
                                        <FontAwesomeIcon className={cx('nav-main-btn-icon')} icon={faFill} />
                                    </button>
                                )}
                                <button className={cx('nav-main-btn')} onClick={handleCPel}>
                                    <FontAwesomeIcon className={cx('nav-main-btn-icon')} icon={faCopy} />
                                </button>
                                <button className={cx('nav-main-btn')} onClick={() => handleLockElement(true)}>
                                    <FontAwesomeIcon className={cx('nav-main-btn-icon')} icon={faUnlock} />
                                </button>
                                <button className={cx('nav-main-btn')} onClick={handleRemoveElement}>
                                    <FontAwesomeIcon className={cx('nav-main-btn-icon')} icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    </div>
                )
            )}

            <div className={cx('slide-element')}>
                <div className={cx('slide-element-border', { active: isSelectDisplay || element.lock })}></div>

                {/* <div className={cx('radito-3', { disable: !openDrag })}>
                        <FontAwesomeIcon icon={faRotate} />
                        <div className={cx('radito-stick')}></div>
                    </div> */}

                <div className={cx({ 'shape-element': element.tab === TYPE_SHAPE }, { [element.tab]: element.tab })}>
                    {renderElementDrag}
                </div>
            </div>
        </Rnd>
    );
}

export default DraggableElement;
