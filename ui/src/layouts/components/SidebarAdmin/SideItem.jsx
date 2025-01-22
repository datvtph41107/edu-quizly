import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './SidebarAdmin.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(style);

function SideItem({ items = [] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className={cx('side-item')}>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={cx('item', { active: index === activeIndex, remain: index != activeIndex })}
                    onClick={() => handleClick(index)}
                >
                    <div>
                        <FontAwesomeIcon icon={item.icon} className={cx('icon')} />
                    </div>
                    <span className={cx('text')}>{item.text}</span>
                </div>
            ))}
        </div>
    );
}

export default SideItem;
