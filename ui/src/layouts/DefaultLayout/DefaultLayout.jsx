import Header from '../components/Header';
import style from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('main-contain')}></div>
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;
