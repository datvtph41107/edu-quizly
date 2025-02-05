import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderSlide from '../components/HeaderSlide';
import SidebarMakeSlide from '../components/SidebarMakeSlide';
import styles from './MakeSlideLayout.module.scss';
import classNames from 'classnames/bind';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

const cx = classNames.bind(styles);

function MakeSlideLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderSlide />
            <div className={cx('container')}>
                <div className={cx('side')}>
                    <SidebarMakeSlide />
                </div>
                <div className={cx('contain')}>
                    <div className={cx('head')}>
                        <FontAwesomeIcon icon={faLayerGroup} />
                        Themes
                    </div>
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default MakeSlideLayout;
