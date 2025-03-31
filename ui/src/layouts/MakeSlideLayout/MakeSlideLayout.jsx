import HeaderSlide from '../components/HeaderSlide';
import SidebarMakeSlide from '../components/SidebarMakeSlide';
import styles from './MakeSlideLayout.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { useStateContext } from '~/context/ContextProvider';
import React from 'react';
import Editor from '~/components/Editor/Editor';

const cx = classNames.bind(styles);

function MakeSlideLayout({ children }) {
    const { editorMoute } = useStateContext();

    return (
        <div className={cx('wrapper')}>
            <HeaderSlide />
            <div className={cx('container')}>
                <div className={cx('side')}>
                    <SidebarMakeSlide />
                </div>
                <div className={cx('contain')}>
                    <div className={cx('head', { edit: editorMoute })}>
                        {editorMoute && <Editor />}

                        <div className={cx('thems')}>
                            <FontAwesomeIcon icon={faLayerGroup} />
                            Themes
                        </div>
                    </div>
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default MakeSlideLayout;
