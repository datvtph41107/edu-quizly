import style from './HeaderV2.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function HeaderV2() {
    return (
        <div className={cx('wrapper')}>
            <h1>HeaderV2</h1>
        </div>
    );
}

export default HeaderV2;
