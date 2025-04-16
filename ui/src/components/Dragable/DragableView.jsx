import React from 'react';
import styles from './Dragable.module.scss';
import classNames from 'classnames/bind';
import { renderView } from '~/components/ElementTypes/ElementTypes';
import './drag.css';
import useStore from '~/features/store';
import { TYPE_SHAPE } from '~/utils/Const';
import { Rnd } from 'react-rnd';

const cx = classNames.bind(styles);

function DraggableView({ element, selectedElements, storeElementBoundingBox }) {
    const { editors } = useStore();

    const editor = editors[element.id];

    const isSelected = storeElementBoundingBox.map((el) => el.id).includes(element.id);

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
        },
        tab: element.tab,
    });

    return (
        <div className={cx('slide-el-display')}>
            <Rnd
                style={{
                    zIndex: element.zIndex,
                    willChange: 'transform',
                }}
                size={{
                    width: element.transform.size.width,
                    height: element.transform.size.height,
                }}
                position={{ x: element.transform.position.x - 1.6, y: element.transform.position.y - 1.6 }}
                disableDragging={true}
                enableResizing={false}
                minWidth={40}
                minHeight={element.type !== 'line' ? 40 : 5}
                maxHeight={element.type === 'line' ? 16 : undefined}
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
