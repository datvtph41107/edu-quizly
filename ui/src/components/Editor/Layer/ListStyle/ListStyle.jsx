import classNames from 'classnames/bind';
import styles from './ListStyle.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListOl, faListUl } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ListStyle(params) {
    return (
        <>
            <div style={{ position: 'relative', marginLeft: '2px' }}>
                <button className={cx('box-btn')}>
                    <div className={cx('box-btn-grap')}>
                        <FontAwesomeIcon icon={faListOl} />
                    </div>
                </button>
            </div>
            <div style={{ position: 'relative', marginLeft: '2px' }}>
                <button className={cx('box-btn')}>
                    <div className={cx('box-btn-grap')}>
                        <FontAwesomeIcon icon={faListUl} />
                    </div>
                </button>
            </div>
        </>
    );
}

export default ListStyle;
