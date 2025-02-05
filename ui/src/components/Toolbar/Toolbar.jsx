import React from 'react';
import styles from './Toolbar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Toolbar() {
    return (
        <div className={cx('toolbar')}>
            <button>Add Element</button>
            <button>Save</button>
            <button>Reset</button>
        </div>
    );
}

export default Toolbar;
