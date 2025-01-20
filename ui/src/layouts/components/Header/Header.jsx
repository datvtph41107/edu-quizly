import style from './Header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <h1>Header</h1>
        </div>
    );
}

export default Header;
