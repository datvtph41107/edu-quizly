import styles from './SidebarContent.module.scss';
import classNames from 'classnames/bind';
import { faArrowLeft, faBackward, faCloudArrowUp, faPlus, faStepBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PreviewItemBlock from './PreviewSlide/PreviewItemBlock';
import TextBar from './TextBar';
import Shape from './Shape/Shape';
import Table from './Table';
import { useEffect, useState } from 'react';
import SelectPreviewSlide from './SelectPreviewSlide';
import { useStateContext } from '~/context/ContextProvider';

const cx = classNames.bind(styles);

function SidebarContent({ side, items, openSlide }) {
    const { setOpenSlide } = useStateContext();
    // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    // const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    // useEffect(() => {
    //     if (items.length == 0) {
    //         setIsSidebarOpen((prevState) => {
    //             if (prevState) {
    //                 setTimeout(() => {
    //                     setIsSidebarVisible(false);
    //                 }, 500);
    //             } else {
    //                 setIsSidebarVisible(true);
    //             }
    //             return !prevState;
    //         });
    //     }
    // }, [items]);

    const renderSide = () => {
        switch (side) {
            case 'Slides':
                if (openSlide.open) {
                    return <SelectPreviewSlide />;
                } else {
                    return <PreviewItemBlock />;
                }
            case 'Text':
                return <TextBar />;
            case 'Media':
                return 'Media';
            case 'Shapes':
                return <Shape />;
            case 'Tables':
                return <Table />;
            default:
                return 'Not Found';
        }
    };

    return (
        <div className={cx('sidebar')}>
            <div className={cx('sidebar-container')}>
                <div className={cx('sidebar-contain')}>
                    <ul className={cx('sidebar-list')}></ul>
                    {renderSide()}
                </div>
            </div>
            <div className={cx('toast-bar')}>
                {openSlide.open ? (
                    <button
                        disabled={!openSlide.back}
                        onClick={() =>
                            setOpenSlide({
                                open: false,
                                back: false,
                            })
                        }
                        type="button"
                        className={cx('btn', 'back')}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span>Back to slides</span>
                    </button>
                ) : (
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <button type="button" className={cx('btn', 'out')}>
                            <FontAwesomeIcon icon={faCloudArrowUp} />
                            <span>Import</span>
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setOpenSlide({
                                    open: true,
                                    back: true,
                                })
                            }
                            className={cx('btn', 'pri')}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            <span>Add new slide</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SidebarContent;
