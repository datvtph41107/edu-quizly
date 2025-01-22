import classNames from 'classnames/bind';
import style from './SidebarAdmin.module.scss';
import Logo from '~/components/Logo';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChartPie, faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import SideItem from './SideItem';

const cx = classNames.bind(style);

const items = [
    {
        icon: faHome,
        text: 'Explore',
    },
    {
        icon: faBook,
        text: 'Library',
    },
    {
        icon: faChartPie,
        text: 'Reports',
    },
];

function SidebarAdmin() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('sidebar-main')}>
                    <div className={cx('contain')}>
                        <div className={cx('element')}>
                            <Logo title={'Student'} />
                            <Button large primary leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                                Create
                            </Button>
                            <SideItem items={items} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarAdmin;
