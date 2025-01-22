import Search from '~/layouts/components/Search';
import style from './Admin.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Navigation from './Navigation';
import ContentElement from './ContentElement';

const cx = classNames.bind(style);

function Admin() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div>
                    <h2 className={cx('title')}>What are you teaching today?</h2>
                </div>
                <div className={cx('contain')}>
                    <Search />
                </div>
                <Navigation />
            </div>
            <ContentElement />
        </div>
    );
}

export default Admin;
