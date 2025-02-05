import { faBarsStaggered, faFont, faPhotoFilm, faShapes, faTable } from '@fortawesome/free-solid-svg-icons';
import styles from './SidebarMakeSlide.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SidebarPreview from './components/SidebarContent';
import { useState } from 'react';

const cx = classNames.bind(styles);

const sideLists = [
    {
        icon: faBarsStaggered,
        text: 'Slides',
        selected: true,
    },
    {
        icon: faFont,
        text: 'Text',
        selected: false,
    },
    {
        icon: faPhotoFilm,
        text: 'Media',
        selected: false,
    },
    {
        icon: faShapes,
        text: 'Shapes',
        selected: false,
    },
    {
        icon: faTable,
        text: 'Tables',
        selected: false,
    },
];

function SidebarMakeSlide() {
    const [lists, setLists] = useState(sideLists);
    const [side, setSide] = useState('Slides');

    const handleSelect = (index, side) => {
        const updatedLists = lists.map((list, i) => ({
            ...list,
            selected: i === index,
        }));
        setLists(updatedLists);
        setSide(side);
    };

    return (
        <div className={cx('wrapper')}>
            <aside className={cx('side-sub')}>
                <ul className={cx('list')}>
                    {lists.map((side, index) => (
                        <li
                            key={index}
                            className={cx('list-item', { active: side.selected })}
                            onClick={() => handleSelect(index, side.text)}
                        >
                            <div className={cx({ first: side.text === 'Slides' })}></div>
                            <div className={cx('item')}>
                                <FontAwesomeIcon icon={side.icon} />
                                <p>{side.text}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <SidebarPreview side={side} />
            </aside>
        </div>
    );
}

export default SidebarMakeSlide;
