import HeaderSlide from '../components/HeaderSlide';
import SidebarMakeSlide from '../components/SidebarMakeSlide';
import styles from './MakeSlideLayout.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowPointer, faLayerGroup, faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Editor from '~/components/Editor/Editor';
import useStore from '~/features/store';
import { useStateContext } from '~/context/ContextProvider';

const cx = classNames.bind(styles);

function MakeSlideLayout({ children }) {
    const { openSlide, setOpenSlide } = useStateContext();
    const { items, selectedElements } = useStore();
    console.log(selectedElements.element);

    return (
        <div className={cx('wrapper')}>
            <HeaderSlide />
            <div className={cx('container')}>
                <div className={cx('side')}>
                    <SidebarMakeSlide openSlide={openSlide} />
                </div>
                <div className={cx('contain')}>
                    <div className={cx('head', { edit: selectedElements.element })}>
                        {selectedElements.element && <Editor />}

                        <div className={cx('thems')}>
                            <FontAwesomeIcon icon={faLayerGroup} />
                            Themes
                        </div>
                    </div>
                    {items.length > 0 ? (
                        <div>{children}</div>
                    ) : (
                        <div
                            className={cx('wrapper-lesson')}
                            onClick={() =>
                                setOpenSlide({
                                    open: true,
                                    back: false,
                                })
                            }
                        >
                            <div className={cx('lesson')}>
                                <div className={cx('content')}>
                                    <div className={cx('bg')}>
                                        <FontAwesomeIcon className={cx('icon')} icon={faPlus} />
                                    </div>
                                </div>
                                <div className={cx('poin')}>
                                    <FontAwesomeIcon icon={faArrowPointer} />
                                </div>
                                <div className={cx('description')}>
                                    <h3>Create from scratch</h3>
                                    <span>Start by adding a new Slide</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MakeSlideLayout;
