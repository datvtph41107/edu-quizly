import { faArrowRightLong, faCircle, faPlay, faSquare, faStar } from '@fortawesome/free-solid-svg-icons';
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
import Table from '../Table';

const cx = classNames.bind(styles);

function Shape() {
    const { selectedSlideId, addElementIntoSlide } = useStore();

    const pattern = ({
        type,
        width = 140,
        height = 140,
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
                html: '',
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
                    onClick: () => pattern({ type: TYPE_SHAPE_LINE, width: 125, height: 4 }),
                },
                {
                    icon: <FontAwesomeIcon icon={faArrowRightLong} />,
                    onClick: () => pattern({ type: TYPE_SHAPE_ARROW, width: 130, height: 60 }),
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
            <div className={cx('side-preview-wrapper')}>
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
                <div>
                    <Table selectedSlideId={selectedSlideId} addElementIntoSlide={addElementIntoSlide} />
                </div>
            </div>
        </div>
    );
}

export default Shape;
