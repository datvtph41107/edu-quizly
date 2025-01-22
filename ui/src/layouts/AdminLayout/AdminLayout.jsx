import HeaderV2 from '../components/HeaderV2';
import SidebarAdmin from '../components/SidebarAdmin/SidebarAdmin';
import style from './AdminLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function AdminLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-control')}>
                <div>
                    <SidebarAdmin />
                </div>
                <div className={cx('container')}>
                    <div className={cx('header')}>
                        <HeaderV2 />
                    </div>
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
