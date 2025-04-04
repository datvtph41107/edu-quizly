import classNames from 'classnames/bind';
import styles from './Editor.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faCaretDown, faFill, faPen, faTextHeight } from '@fortawesome/free-solid-svg-icons';
import FontFamily from './Layer/FontFamily/FontFamily';
import FontSize from './Layer/FontSize/FontSize';
import ColorPicker from './Layer/ColorPicker/ColorPicker';
import StyleType from './Layer/StyleType/StyleType';
import ListStyle from './Layer/ListStyle/ListStyle';
import { useStateContext } from '~/context/ContextProvider';
import useStore from '~/features/store';
import Order from './Layer/Order/Order';
import TextAlign from './Layer/TextAlign/TextAlign';

const cx = classNames.bind(styles);

function Editor() {
    const { editor } = useStateContext();
    const { selectedElements } = useStore();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('start')}></div>
            <div className={cx('toolbar')}>
                <div className={cx('toolbar-drop')}>
                    <div className={cx('toolbar-container')}>
                        {selectedElements?.element?.tab === 'shape' && (
                            <>
                                <div className={cx('box-tool')}>
                                    <div style={{ position: 'relative' }}>
                                        <button className={cx('box-btn')}>
                                            <div
                                                style={{ boxShadow: '0px -2px 0px inset' }}
                                                className={cx('box-btn-grap')}
                                            >
                                                <FontAwesomeIcon icon={faFill} />
                                            </div>
                                        </button>
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <button className={cx('box-btn')}>
                                            <div
                                                style={{ boxShadow: '0px -2px 0px inset' }}
                                                className={cx('box-btn-grap')}
                                            >
                                                <FontAwesomeIcon icon={faPen} />
                                            </div>
                                        </button>
                                    </div>
                                    <div style={{ position: 'relative', padding: '10px', marginTop: '5px' }}>
                                        <div className={cx('box-btn-cs')}>
                                            <div
                                                style={{ height: '0.5px', width: '100%', marginBottom: '2px' }}
                                                className={cx('bg-faded')}
                                            ></div>
                                            <div
                                                style={{ height: '1px', width: '100%', marginBottom: '2px' }}
                                                className={cx('bg-faded')}
                                            ></div>
                                            <div
                                                style={{ height: '1.5px', width: '100%', marginBottom: '2px' }}
                                                className={cx('bg-faded')}
                                            ></div>
                                            <div
                                                style={{ height: '2px', width: '100%', marginBottom: '2px' }}
                                                className={cx('bg-faded')}
                                            ></div>
                                        </div>
                                    </div>
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
