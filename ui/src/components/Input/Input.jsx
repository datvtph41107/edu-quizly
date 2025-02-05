import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input({ label = '', name = '', classes = false, classNameLabel = false, type = 'input', placeholder = '' }) {
    return (
        <div className={cx('wrapper')}>
            <label className={classNameLabel}>{label}</label>
            <input type={type} name={name} className={cx(classes)} placeholder={placeholder} />
        </div>
    );
}

export default Input;
