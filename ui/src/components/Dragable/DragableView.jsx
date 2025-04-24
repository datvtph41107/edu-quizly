import React, { useEffect, useState } from 'react';
import styles from './Dragable.module.scss';
import classNames from 'classnames/bind';
import { renderView } from '~/components/ElementTypes/ElementTypes';
import './drag.css';
import useStore from '~/features/store';
import { TYPE_SHAPE } from '~/utils/Const';
import { Rnd } from 'react-rnd';

const cx = classNames.bind(styles);

function DraggableView({ element, storeElementBoundingBox, isPreview = false, scale = 1 }) {
    const [hasFocusedOnce, setHasFocusedOnce] = useState(false);
    const [takeOpcity, setTakeOpcity] = useState(false);
    const { editors } = useStore();
    const editor = editors[element.id];

    const isSelected = storeElementBoundingBox.map((el) => el.id).includes(element.id);

    useEffect(() => {
        if (!editor || isPreview) return;
    }, [editor, isPreview]);

    useEffect(() => {
        if (!editor) return;

        const handleFocus = () => {
            if (!hasFocusedOnce) {
                setHasFocusedOnce(true);
            }
        };

        editor.on('focus', handleFocus);
        return () => {
            editor.off('focus', handleFocus);
        };
    }, [editor, hasFocusedOnce]);

    useEffect(() => {
        if (!editor) return;

        const handleFocus = () => {
            if (!hasFocusedOnce) {
                setTakeOpcity(true);
            }
        };

        const handleBlur = () => {
            if (!hasFocusedOnce) {
                setTakeOpcity(false);
            }
        };

        editor.on('focus', handleFocus);
        editor.on('blur', handleBlur);
        return () => {
            editor.off('focus', handleFocus);
            editor.off('blur', handleBlur);
        };
    }, [editor]);

    // ELEMENT VIEW RENDER
    const renderViewDr = renderView({
        type: element.type,
        propStyles: {
            id: `element-${element.id}`,
            width: element.transform.size.width,
            height: element.transform.size.height,
            borderStroke: element.borderSize === '' ? '0' : element.borderSize,
            borderColorStroke: element.borderColor === '' ? '#429a50' : element.borderColor,
            fillColor: element.backgroundColor === '' ? '#429a50' : element.backgroundColor,
            scale,
            style: {
                overflow: 'visible',
                verticalAlign: 'middle',
                display: 'block',
                ...(element.type === 'block' ? { backgroundColor: '#018a38' } : {}),
            },
        },
        props: {
            element: element,
            isSelected: isSelected,
            editor: editor,
            isPreview: isPreview,
        },
        tab: element.tab,
    });

    const x = (element.transform.position.x - 1.6) * scale;
    const y = (element.transform.position.y - 1.6) * scale;
    const width = element.transform.size.width * scale;
    const height = element.transform.size.height * scale;

    return (
        <div
            className={cx('slide-el-display', {
                'opacity-zero': takeOpcity && !isPreview,
            })}
        >
            <Rnd
                style={{
                    zIndex: element.zIndex,
                    willChange: 'transform',
                }}
                size={{ width, height }}
                position={{ x, y }}
                disableDragging={true}
                enableResizing={false}
                minWidth={40 * scale}
                minHeight={(element.type !== 'line' ? 40 : 5) * scale}
                maxHeight={element.type === 'line' ? 16 * scale : undefined}
                dragGrid={[5, 5]}
            >
                <div className={cx('slide-element')}>
                    {/* <div className={cx('radito-3', { disable: !openDrag })}>
                        <FontAwesomeIcon icon={faRotate} />
                        <div className={cx('radito-stick')}></div>
                    </div> */}

                    <div
                        className={cx({ 'shape-element': element.tab === TYPE_SHAPE }, { [element.tab]: element.tab })}
                    >
                        {renderViewDr}
                    </div>
                </div>
            </Rnd>
        </div>
    );
}

export default DraggableView;
