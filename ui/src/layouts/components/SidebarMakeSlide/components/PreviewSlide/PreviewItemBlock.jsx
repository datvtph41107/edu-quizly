import SidebarPreviewItem from './SidebarPreviewItem';
import useStore from '~/features/store';
import styles from './SidebarPreview.module.scss';
import classNames from 'classnames/bind';
import { TAB_QUESTION } from '~/utils/Const';
import SidebarPreviewItemQuestion from './SidebarPreviewItemQuestion';

const cx = classNames.bind(styles);

function PreviewItemBlock() {
    const {
        selectedSlideId,
        setSelectedSlide,
        items,
        copyNewSlide,
        removeSlide,
        updateEditorText,
        validateQuestionAndAnswers,
        updateQuestionText,
        updateAnswerText,
    } = useStore();

    return (
        <>
            <div className={cx('side-preview')}>
                <div className={cx('side-preview-wrapper')}>
                    {items.map((item, index) =>
                        item.tab === TAB_QUESTION ? (
                            <SidebarPreviewItemQuestion
                                key={index}
                                countSlide={index + 1}
                                items={items}
                                question={item.question}
                                isSelected={selectedSlideId === item.id}
                                onSelect={() => setSelectedSlide(item.id)}
                                copyNewSlide={() => copyNewSlide(item.id)}
                                removeSlide={() => removeSlide(item.id)}
                                updateEditorText={updateEditorText}
                                validateQuestionAndAnswers={validateQuestionAndAnswers}
                                updateQuestionText={updateQuestionText}
                                updateAnswerText={updateAnswerText}
                            />
                        ) : (
                            <SidebarPreviewItem
                                key={index}
                                countSlide={index + 1}
                                elements={item.elements}
                                isSelected={selectedSlideId === item.id}
                                onSelect={() => setSelectedSlide(item.id)}
                                copyNewSlide={() => copyNewSlide(item.id)}
                                removeSlide={() => removeSlide(item.id)}
                            />
                        ),
                    )}
                </div>
            </div>
        </>
    );
}

export default PreviewItemBlock;
