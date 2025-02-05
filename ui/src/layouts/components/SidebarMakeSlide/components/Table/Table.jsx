import { faArrowRightLong, faCircle, faMinus, faPlay, faSquare, faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './Table.module.scss';
import classNames from 'classnames/bind';
import TaskbarItem from '~/components/TaskbarItem/TaskbarItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '~/components/Input';

const cx = classNames.bind(styles);

function Table() {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>Dimensions for table</h2>
            <div className={cx('field-wrapper')}>
                <Input classNameLabel={cx('form-label')} label="Number of rows" placeholder="Number of rows" />
                <Input />
            </div>
        </div>
    );
}

export default Table;
