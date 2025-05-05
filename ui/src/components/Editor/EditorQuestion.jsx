import classNames from 'classnames/bind';
import styles from './Editor.module.scss';
import ColorPicker from './Layer/ColorPicker/ColorPicker';
import StyleType from './Layer/StyleType/StyleType';
import useStore from '~/features/store';
import SectionType from './Layer/SectionType/SectionType';
import SectionTiming from './Layer/SectionTimming/SectionTimming';
import SectionPoint from './Layer/SectionPoint/SectionPoint';
import AnswerExplain from './Layer/AnswerExplain/AnswerExplain';

const cx = classNames.bind(styles);

function EditorQuestion({ selectedSlideItem }) {
    const { editors, answerExplainOpen } = useStore();
    const tab = selectedSlideItem.tab;

    const questionId = answerExplainOpen ? selectedSlideItem.question.explain.id : selectedSlideItem.question.id;
    const editor = editors[questionId];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('start')}></div>
            <div className={cx('toolbar')}>
                <div className={cx('toolbar-drop')}>
                    <div className={cx('toolbar-container')}>
                        <div className={cx('section-wrapper')}>
                            <SectionType />
                            {/* COLOR PICKER */}
                            <ColorPicker editor={editor} tab={tab} />

                            <div className={cx('start')}></div>
                            {/* STYLE TYPE */}
                            <StyleType editor={editor} tab={tab} />
                            <div className={cx('start')}></div>

                            {/* POINT */}
                            <SectionPoint />
                            {/* TIMMING */}
                            <SectionTiming />
                            <div className={cx('start')}></div>

                            <AnswerExplain />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditorQuestion;
