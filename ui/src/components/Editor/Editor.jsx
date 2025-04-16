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
import { TYPE_SHAPE } from '~/utils/Const';
import BorderSize from './Layer/BorderSize/BorderSize';
import BorderColor from './Layer/BorderColor/BorderColor';
import FillColor from './Layer/FillColor/FillColor';

const cx = classNames.bind(styles);

function Editor() {
    const { selectedElements, editors } = useStore();
    const editor = editors[selectedElements?.element?.id];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('start')}></div>
            <div className={cx('toolbar')}>
                <div className={cx('toolbar-drop')}>
                    <div className={cx('toolbar-container')}>
                        {selectedElements?.element?.tab === TYPE_SHAPE && (
                            <>
                                <div className={cx('box-tool')}>
                                    <FillColor editor={editor} />
                                    <BorderColor editor={editor} />
                                    <BorderSize editor={editor} />
                                </div>
                                <div className={cx('start')}></div>
                            </>
                        )}
                        <div className={cx('section-wrapper')}>
                            {/*START: FontFamily */}
                            <FontFamily editor={editor} />
                            {/*END: FF  */}

                            {/* Font Size */}
                            <FontSize editor={editor} elementId={selectedElements?.element?.id} />

                            {/* COLOR PICKER */}
                            <ColorPicker editor={editor} />

                            <div className={cx('start')}></div>
                            {/* STYLE TYPE */}
                            <StyleType editor={editor} />

                            <div className={cx('start')}></div>
                            {/* ORDER */}
                            <Order editor={editor} />

                            {/* TEXT ALIGN */}
                            <TextAlign editor={editor} />

                            <div className={cx('start')}></div>
                            {/* List Style */}
                            <ListStyle editor={editor} />

                            <div className={cx('start')}></div>
                            <div className={cx('section-family', 'w-12')}>
                                <div className={cx('section-wrap')}>
                                    <button type="button" className={cx('section-dropdown')}>
                                        <span>
                                            <FontAwesomeIcon icon={faTextHeight} />
                                        </span>
                                        <div className={cx('section-dropdown-node')}>
                                            <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: '4px' }} />
                                        </div>
                                    </button>
                                </div>
                            </div>
                            {/* <div className={cx('section-family')}>
                                <div className={cx('section-label')}>Font (with selected value) Quicksand</div>
                                <div className={cx('section-wrap')}>
                                    <button type="button" className={cx('section-dropdown')}>
                                        <span>Insert equation</span>
                                        <div className={cx('section-dropdown-node')}>
                                            <FontAwesomeIcon icon={faCaretDown} />
                                        </div>
                                    </button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Editor;
