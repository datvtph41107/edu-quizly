import { faBarsStaggered, faFont, faPhotoFilm, faShapes, faTable } from '@fortawesome/free-solid-svg-icons';
import styles from './SidebarMakeSlide.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SidebarPreview from './SidebarPreview';

const cx = classNames.bind(styles);

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
    {
        icon: faTable,
        text: 'Tables',
    },
];

function SidebarMakeSlide() {
    return (
        <div className={cx('wrapper')}>
            <aside className={cx('side-sub')}>
                <ul className={cx('list')}>
                    {sideLists.map((side, index) => (
                        <li key={index} className={cx('list-item')}>
                            <div className={cx({ first: side.text === 'Slides' })}></div>
                            <div className={cx('item')}>
                                <FontAwesomeIcon icon={side.icon} />
                                <p>{side.text}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <SidebarPreview />
            </aside>
        </div>
    );
}

export default SidebarMakeSlide;
