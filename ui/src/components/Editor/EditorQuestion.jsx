import classNames from 'classnames/bind';
import styles from './Editor.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faFill, faPen, faTextHeight } from '@fortawesome/free-solid-svg-icons';
import FontFamily from './Layer/FontFamily/FontFamily';
import FontSize from './Layer/FontSize/FontSize';
import ColorPicker from './Layer/ColorPicker/ColorPicker';
import StyleType from './Layer/StyleType/StyleType';
import ListStyle from './Layer/ListStyle/ListStyle';
import useStore from '~/features/store';
import Order from './Layer/Order/Order';
import TextAlign from './Layer/TextAlign/TextAlign';
import { TYPE_SHAPE, TYPE_SHAPE_ARROW, TYPE_SHAPE_LINE } from '~/utils/Const';
import BorderSize from './Layer/BorderSize/BorderSize';
import BorderColor from './Layer/BorderColor/BorderColor';
import FillColor from './Layer/FillColor/FillColor';
import SectionType from './Layer/SectionType/SectionType';

const cx = classNames.bind(styles);

function EditorQuestion({ selectedSlideItem }) {
    const { editors } = useStore();
    const tab = selectedSlideItem.tab;
    const questionId = selectedSlideItem.question.id;
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditorQuestion;
