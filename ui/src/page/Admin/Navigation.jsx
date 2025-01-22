import { faBook, faCalendarCheck, faChalkboardTeacher, faHeart, faVideo } from '@fortawesome/free-solid-svg-icons';
import styles from './Admin.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef, useEffect } from 'react';

const cx = classNames.bind(styles);

const items = [
    {
        icon: faHeart,
        text: 'For you',
        style: 'heart',
    },
    {
        icon: faCalendarCheck,
        text: 'Assessments',
        style: 'assessment',
    },
    {
        icon: faChalkboardTeacher,
        text: 'Lessons',
        style: 'lesson',
    },
    {
        icon: faVideo,
        text: 'Interactive videos',
        style: 'interactive',
    },
    {
        icon: faBook,
        text: 'Passages',
        style: 'passage',
    },
];

function Navigation() {
    const [itemWidth, setItemWidth] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const navRefs = useRef([]);

    useEffect(() => {
        if (navRefs.current[0]) {
            const firstItem = navRefs.current[0];
            const { width, left } = firstItem.getBoundingClientRect();
            const parentLeft = firstItem.parentNode.getBoundingClientRect().left;
            setItemWidth(width);
            setTranslateX(left - parentLeft);
        }
    }, []);

    const handleClick = (index) => {
        if (navRefs.current[index]) {
            const currentItem = navRefs.current[index];
            const { width, left } = currentItem.getBoundingClientRect();
            const parentLeft = navRefs.current[0].parentNode.getBoundingClientRect().left;
            setItemWidth(width);
            setTranslateX(left - parentLeft);
            setActiveIndex(index);
        }
    };

    return (
        <ul className={cx('navigation')}>
            {items.map((item, index) => (
                <li
                    key={index}
                    className={cx('nav-item', { active: index != activeIndex })}
                    onClick={() => handleClick(index)}
                    ref={(el) => (navRefs.current[index] = el)}
                >
                    <div className={cx('icon', item.style)}>
                        <FontAwesomeIcon icon={item.icon} />
                    </div>
                    <div className={cx('text')}>{item.text}</div>
                </li>
            ))}
            <div
                className={cx('progress-nav')}
                style={{
                    width: `${itemWidth}px`,
                    transform: `translateX(${translateX}px)`,
                }}
            ></div>
        </ul>
    );
}

export default Navigation;
