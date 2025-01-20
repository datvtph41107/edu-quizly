import style from './Admin.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Admin() {
    return (
        <div className={cx('wrapper')}>
            <h1>Admin</h1>
        </div>
    );
}

export default Admin;
