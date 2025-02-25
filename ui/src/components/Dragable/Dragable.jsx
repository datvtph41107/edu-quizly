import React, { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import styles from './Dragable.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faFill, faRotate, faTrash, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ArrowIcon, EllipseIcon, LineIcon, StarIcon, TriangleIcon } from '~/components/Icons';
import './drag.css';

const cx = classNames.bind(styles);

function DraggableElement({
    element,
    onUpdate,
    className = false,
    type = '',
    selectedElementsState,
    onSelect,
    containerRef,
    getBoundingBox,
    setBoundingBox,
    isDraggingToSelect,
    setisDraggingToSelect,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [openDrag, setOpenDrag] = useState(false);
    const [content, setContent] = useState('');
    const contentRef = useRef(null);
    const elemetRef = useRef(null);
    let Comp = 'div';
    let count = 0;

    const extensions = [StarterKit];

    if (type === 'arrow') {
        Comp = ArrowIcon;
        count = 1;
    } else if (type === 'circle') {
        Comp = EllipseIcon;
        count = 2;
    } else if (type === 'star') {
        Comp = StarIcon;
        count = 3;
    } else if (type === 'triangle') {
        Comp = TriangleIcon;
        count = 4;
    } else if (type === 'line') {
        Comp = LineIcon;
        count = 5;
    }

    const classes = cx('content', {
        shape: element.tab === 'shape',
        [className]: className,
        arrow: count === 1,
        circle: count === 2,
        star: count === 3,
        triangle: count === 4,
        line: count === 5,
    });

    const editor = useEditor({
        extensions: extensions,
        content: content,
        autofocus: true,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contentRef.current && !contentRef.current.contains(event.target)) {
                setIsEditing(false);
            }
            if (elemetRef.current && !elemetRef.current.contains(event.target)) {
                setOpenDrag(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isEditing && editor) {
            editor.commands.focus();
        }
    }, [isEditing, editor]);

    const handleDrag = (e, d) => {
        setOpenDrag(true);
        setisDraggingToSelect(false);
        if (selectedElementsState.length > 0) {
            selectedElementsState.forEach((el) => {
                if (el.id === Number(d.node.id)) {
                    if (el.x !== d.x || el.y !== d.y) {
                        const deltaX = d.x - el.x;
                        const deltaY = d.y - el.y;

                        const updatedElements = selectedElementsState.map((el) => {
                            const updatedX = el.x + deltaX;
                            const updatedY = el.y + deltaY;

                            onUpdate(el.id, { x: updatedX, y: updatedY });

                            return {
                                ...el,
                                x: updatedX,
                                y: updatedY,
                            };
                        });

                        setBoundingBox(getBoundingBox(updatedElements));
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

    const handleOpenDragging = () => {
        // selectedElementsState([]);
        setOpenDrag(true);
    };

    const isSelected = selectedElementsState.map((el) => el.id).includes(element.id);

    return (
        <Rnd
            id={element.id}
            className={cx(
                'wrapper',
                { disable: openDrag },
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
                topLeft: 'node-1 ' + (!openDrag && 'disable'),
                topRight: 'node-2 ' + (!openDrag && 'disable'),
                bottomLeft: 'node-3 ' + (!openDrag && 'disable'),
                bottomRight: 'node-4 ' + (!openDrag && 'disable'),
                top: 'node-5 ' + (!openDrag && 'disable'),
                bottom: 'node-6 ' + (!openDrag && 'disable'),
                left: 'node-7 ' + (!openDrag && 'disable'),
                right: 'node-8 ' + (!openDrag && 'disable'),
            }}
            minWidth={40}
            minHeight={type !== 'line' ? 40 : 5}
            maxHeight={type === 'line' ? 16 : undefined}
        >
            <div className={cx('nav-contain', { disable: !openDrag })}>
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

            <div ref={elemetRef} className={cx('slide-element')} onClick={handleOpenDragging}>
                <div className={cx('radito-3', { disable: !openDrag })}>
                    <FontAwesomeIcon icon={faRotate} />
                    <div className={cx('radito-stick')}></div>
                </div>

                <div className={cx('shape-element')}>
                    {/* // check id when selected mousedown by boundingBox */}
                    <Comp
                        id={'shape' + (isSelected ? `-selected-${element.id}` : '')}
                        style={type === 'block' ? { backgroundColor: '#018a38' } : {}}
                        className={classes}
                        width={element.width}
                        height={element.height}
                    />
                    {type !== 'line' && type !== 'arrow' && (
                        <div
                            id={'contentText' + (isSelected ? '-selected' : '')}
                            ref={contentRef}
                            className={cx('content-text')}
                            onClick={() => setIsEditing(true)}
                        >
                            {isEditing || content.length >= 1 ? (
                                <div className={cx('content-text-ce')}>
                                    <EditorContent editor={editor} />
                                </div>
                            ) : (
                                <div className={cx('content-text-type')}>
                                    <p style={{ textAlign: 'center' }}>
                                        {/* <span style={{ fontSize: '14px' }}>Type...</span> */}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Rnd>
    );
}

export default DraggableElement;
