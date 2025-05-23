import styles from './SidebarContent.module.scss';
import classNames from 'classnames/bind';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PreviewItemBlock from './PreviewSlide/PreviewItemBlock';
import TextBar from './TextBar';
import Shape from './Shape/Shape';
import SelectPreviewSlide from './SelectPreviewSlide';
import { useStateContext } from '~/context/ContextProvider';

const cx = classNames.bind(styles);

function SidebarContent({ side, setSide, openSlide }) {
    const { setOpenSlide } = useStateContext();

    const renderSide = () => {
        if (openSlide.open) {
            return <SelectPreviewSlide />;
        }

        switch (side) {
            case 'Slides':
                return <PreviewItemBlock />;
            case 'Text':
                return <TextBar />;
            case 'Media':
                return 'Media';
            case 'Shapes':
                return <Shape />;
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
                        onClick={() => {
                            setOpenSlide({
                                open: false,
                                back: false,
                            });
                            setSide('Slides');
                        }}
                        type="button"
                        className={cx('btn', 'back')}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span>Back to slides</span>
                    </button>
                ) : (
                    <div style={{ display: 'flex', gap: '6px', width: '100%', margin: '0 18px' }}>
                        {/* <button type="button" className={cx('btn', 'out')}>
                            <FontAwesomeIcon icon={faCloudArrowUp} />
                            <span>Import</span>
                        </button> */}
                        <button
                            style={{ width: '100%' }}
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
