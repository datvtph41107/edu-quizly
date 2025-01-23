import styles from './Presentation.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Presentation() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}></div>
        </div>
    );
}

export default Presentation;
