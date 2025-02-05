import { faArrowRightLong, faCircle, faMinus, faPlay, faSquare, faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './Shape.module.scss';
import classNames from 'classnames/bind';
import TaskbarItem from '~/components/TaskbarItem/TaskbarItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Shape() {
    const data = [
        {
            title: 'Pointers',
            rotate: true,
            wrap: [
                {
                    icon: <FontAwesomeIcon icon={faMinus} />,
                },
                {
                    icon: <FontAwesomeIcon icon={faArrowRightLong} />,
                },
            ],
        },
        {
            title: 'Filled shapes',
            rotate: false,
            wrap: [
                {
                    icon: <FontAwesomeIcon icon={faSquare} />,
                },
                {
                    icon: <FontAwesomeIcon icon={faCircle} />,
                },
                {
                    icon: <FontAwesomeIcon style={{ transform: 'rotate(-90deg)' }} icon={faPlay} />,
                },
                {
                    icon: <FontAwesomeIcon icon={faStar} />,
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
                            <TaskbarItem key={idx} box rotate={item.rotate}>
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
