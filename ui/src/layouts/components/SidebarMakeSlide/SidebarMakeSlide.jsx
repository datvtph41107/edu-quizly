import { faBarsStaggered, faFont, faPhotoFilm, faShapes } from '@fortawesome/free-solid-svg-icons';
import styles from './SidebarMakeSlide.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SidebarPreview from './components/SidebarContent';
import { useState } from 'react';
import useStore from '~/features/store';

const cx = classNames.bind(styles);

function SidebarMakeSlide({ openSlide }) {
    const { items } = useStore();

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
    ];
    const [lists, setLists] = useState(sideLists);
    const [side, setSide] = useState('Slides');
    const handleSelect = (index, side) => {
        console.log(index);

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
                            className={cx(
                                'list-item',
                                { hover: items.length > 0 },
                                { active: side.selected },
                                { disable: items.length === 0 },
                            )}
                            onClick={items.length > 0 ? () => handleSelect(index, side.text) : null}
                        >
                            <div className={cx({ first: side.text === 'Slides' })}></div>
                            <div className={cx('item')}>
                                <FontAwesomeIcon icon={side.icon} />
                                <p>{side.text}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                {(items.length > 0 || openSlide.open) && (
                    <SidebarPreview side={side} items={items} openSlide={openSlide} />
                )}
            </aside>
        </div>
    );
}

export default SidebarMakeSlide;
