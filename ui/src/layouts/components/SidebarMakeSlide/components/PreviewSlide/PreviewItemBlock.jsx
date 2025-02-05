import SidebarPreviewItem from './SidebarPreviewItem';
import useStore from '~/features/store';
import styles from './SidebarPreview.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function PreviewItemBlock() {
    const { selectedId, setSelectedSlide, items, copyNewSlide, removeSlide } = useStore();

    return (
        <>
            <div className={cx('side-preview')}>
                <div className={cx('side-preview-wrapper')}>
                    {items.map((item, index) => (
                        <SidebarPreviewItem
                            key={index}
                            countSlide={index + 1}
                            elements={item.elements}
                            isSelected={selectedId === item.id}
                            onSelect={() => setSelectedSlide(item.id)}
                            copyNewSlide={() => copyNewSlide(item.id)}
                            removeSlide={() => removeSlide(item.id)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default PreviewItemBlock;
