import Header from '../components/Header';
import style from './AdminLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function AdminLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('main-contain')}></div>
                {children}
            </div>
        </div>
    );
}

export default AdminLayout;
