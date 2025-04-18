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
        },
        {
            icon: faFont,
            text: 'Text',
        },
        {
            icon: faPhotoFilm,
            text: 'Media',
        },
        {
            icon: faShapes,
            text: 'Shapes',
        },
    ];
    const [side, setSide] = useState('Slides');
    const handleSelect = (side) => {
        setSide(side);
    };

    return (
        <div className={cx('wrapper')}>
            <aside className={cx('side-sub')}>
                <ul className={cx('list')}>
                    {sideLists.map((sideItem, index) => (
                        <li
                            key={index}
                            className={cx(
                                'list-item',
                                { hover: items.length > 0 },
                                { active: side === sideItem.text },
                                { disable: items.length === 0 },
                            )}
                            onClick={items.length > 0 ? () => handleSelect(sideItem.text) : null}
                        >
                            <div className={cx({ first: sideItem.text === 'Slides' })}></div>
                            <div className={cx('item')}>
                                <FontAwesomeIcon icon={sideItem.icon} />
                                <p>{sideItem.text}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                {(items.length > 0 || openSlide.open) && (
                    <SidebarPreview side={side} setSide={setSide} openSlide={openSlide} />
                )}
            </aside>
        </div>
    );
}

export default SidebarMakeSlide;
