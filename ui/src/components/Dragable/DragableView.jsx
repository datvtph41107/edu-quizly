import React, { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import styles from './Dragable.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faFill, faRotate, faTrash, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { useEditor } from '@tiptap/react';
import { isActiveTypeState, updateEditorState, extensions, renderView } from '~/components/ElementTypes/ElementTypes';
import './drag.css';
import useStore from '~/features/store';
import { useStateContext } from '~/context/ContextProvider';
import { TYPE_SHAPE } from '~/utils/Const';

const cx = classNames.bind(styles);

function DraggableView({ className = false, element, selectedElements, storeElementBoundingBox }) {
    const { editorComponents } = useStore();
    const { changeEditorType } = useStateContext();
    const [isEditing, setIsEditing] = useState(false);
    const classes = cx('content', {
        shape: element.tab === TYPE_SHAPE,
        [className]: className,
    });
    const editor = editorComponents[element.id]?.editor;
    const isSelected = storeElementBoundingBox.map((el) => el.id).includes(element.id);

    // ELEMENT VIEW RENDER
    const renderViewDr = renderView({
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
        <div className={cx('slide-el-display')}>
            <div
                style={{
                    position: 'absolute',
                    left: element.transform.position.x,
                    top: element.transform.position.y,
                    width: element.transform.size.width,
                    height: element.transform.size.height,
                    transform: 'rotate(0deg)',
                    zIndex: element.zIndex,
                }}
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
            </div>
        </div>
    );
}

export default DraggableView;
