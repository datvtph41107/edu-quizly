import styles from './SidebarContent.module.scss';
import classNames from 'classnames/bind';
import { faCloudArrowUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PreviewItemBlock from './PreviewSlide/PreviewItemBlock';
import TextBar from './TextBar';
import Shape from './Shape/Shape';
import Table from './Table';

const cx = classNames.bind(styles);

function SidebarContent({ side }) {
    const renderSide = () => {
        switch (side) {
            case 'Slides':
                return <PreviewItemBlock />;
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
                <button type="button" className={cx('btn', 'out')}>
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                    <span>Import</span>
                </button>
                <button type="button" className={cx('btn', 'pri')}>
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Add new slide</span>
                </button>
            </div>
        </div>
    );
}

export default SidebarContent;
