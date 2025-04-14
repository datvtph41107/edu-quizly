import { faArrowRightLong, faCircle, faMinus, faPlay, faSquare, faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './Shape.module.scss';
import classNames from 'classnames/bind';
import TaskbarItem from '~/components/TaskbarItem/TaskbarItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LineIcon } from '~/components/Icons';
import useStore from '~/features/store';
import {
    SHAPE_PLACEHOLDER_SIZE,
    SHAPE_PLACEHOLDER_TEXT,
    TYPE_SHAPE,
    TYPE_SHAPE_ARROW,
    TYPE_SHAPE_CIRCLE,
    TYPE_SHAPE_LINE,
    TYPE_SHAPE_RECTANGLE,
    TYPE_SHAPE_STAR,
    TYPE_SHAPE_TRIANGLE,
} from '~/utils/Const';
import { extensions, useEditor } from '@tiptap/react';
import { isActiveTypeState, updateEditorState } from '~/components/ElementTypes/ElementTypes';

const cx = classNames.bind(styles);

// const editor = useEditor(
//     {
//         editable: true,
//         extensions: extensions,
//         content: element.placeholder,
//         onCreate: ({ editor }) => {
//             // setEditorComponents(element.id, editor);
//             // setEditorComponents(element.id, editor);
//             if (element.type === 'h1') {
//                 editor.commands.setHeading({ level: 1 });
//             }
//         },
//         onSelectionUpdate: ({ editor }) => {
//             const { $from, $to } = editor.state.selection;
//             const start = $from.pos;
//             const end = $to.pos;

//             if (!editor.isEmpty) {
//                 updateEditorState({ editor: editor, setChangeEditorType: setChangeEditorType });
//             }
//         },
//         onUpdate: ({ editor }) => {
//             const editorContent = editor.getHTML();

//             if (editor.isEmpty) {
//                 if (element.type === 'h1') {
//                     editor.commands.setHeading({ level: 1 });
//                 }
//                 isActiveTypeState({ editor: editor, changeEditorType: changeEditorType });
//             }
//         },
//         onBlur: (e) => {
//             setIsEditing(false);
//         },
//     },
//     [],
// );

function Shape() {
    const { selectedSlideId, items, addElementIntoSlide } = useStore();
    console.log(selectedSlideId, items);

    const pattern = ({
        type,
        width = 125,
        height = 125,
        x = 400,
        y = 270,
        placeholder = SHAPE_PLACEHOLDER_TEXT,
        placeholderSize = SHAPE_PLACEHOLDER_SIZE,
        tab = TYPE_SHAPE,
    }) => {
        addElementIntoSlide({
            slideId: selectedSlideId,
            element: {
                x,
                y,
                width,
                height,
                placeholder,
                placeholderSize,
                type,
                tab,
            },
        });
    };

    const data = [
        {
            title: 'Pointers',
            rotate: true,
            wrap: [
                {
                    icon: <LineIcon width="60px" height="6px" borderColorStroke="rgba(104, 103, 103, 0.986)" />,
                    onClick: () =>
                        pattern({
                            type: TYPE_SHAPE_LINE,
                            width: 125,
                            height: 4,
                            placeholder: null,
                            placeholderSize: null,
                        }),
                },
                {
                    icon: <FontAwesomeIcon icon={faArrowRightLong} />,
                    onClick: () =>
                        pattern({
                            type: TYPE_SHAPE_ARROW,
                            width: 130,
                            height: 60,
                            placeholder: null,
                            placeholderSize: null,
                        }),
                },
            ],
        },
        {
            title: 'Filled shapes',
            rotate: false,
            wrap: [
                {
                    icon: <FontAwesomeIcon icon={faSquare} />,
                    onClick: () => pattern({ type: TYPE_SHAPE_RECTANGLE }),
                },
                {
                    icon: <FontAwesomeIcon icon={faCircle} />,
                    onClick: () => pattern({ type: TYPE_SHAPE_CIRCLE }),
                },
                {
                    icon: <FontAwesomeIcon style={{ transform: 'rotate(-90deg)' }} icon={faPlay} />,
                    onClick: () => pattern({ type: TYPE_SHAPE_TRIANGLE }),
                },
                {
                    icon: <FontAwesomeIcon icon={faStar} />,
                    onClick: () => pattern({ type: TYPE_SHAPE_STAR }),
                },
            ],
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>Shapes</h2>
            {data.map((item, index) => (
                <div key={index}>
                    <h3 className={cx('title', 'above')}>
                        <span>{item.title}</span>
                    </h3>
                    <div className={cx('container')}>
                        {item.wrap.map((t, idx) => (
                            <TaskbarItem key={idx} box rotate={item.rotate} onClick={t.onClick}>
                                {t.icon}
                            </TaskbarItem>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Shape;
