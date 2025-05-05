import styles from '../SelectPreviewSlide.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Utils } from '~/utils/Utils';
import { useStateContext } from '~/context/ContextProvider';
import useStore from '~/features/store';
import { TAB_QUESTION } from '~/utils/Const';
import { v4 as uuidv4 } from 'uuid';

const cx = classNames.bind(styles);

function QaSlide() {
    const { setOpenSlide } = useStateContext();
    const { addNewSlide } = useStore();
    const slideTypeActions = {
        QaMultipleChoice: (type) => {
            const defaultTemplate = [
                { id: uuidv4(), text: '', isCorrect: false, disable: false },
                { id: uuidv4(), text: '', isCorrect: false, disable: false },
                { id: uuidv4(), text: '', isCorrect: false, disable: false },
                { id: uuidv4(), text: '', isCorrect: false, disable: false },
                { id: uuidv4(), text: '', isCorrect: false, disable: true },
            ];
            addNewSlide({
                tab: TAB_QUESTION,
                question: {
                    id: uuidv4(),
                    type: type,
                    text: '',
                    mode: 'single', // multiple
                    answers: defaultTemplate,
                    explain: {
                        id: uuidv4(),
                        text: '',
                    },
                },
            });
            setOpenSlide({
                open: false,
                back: false,
            });
        },
        QaInputBlank: (type) => {
            // (Trả lời câu hỏi gõ chữ)
            const defaultTemplate = [
                {
                    id: uuidv4(),
                    hint: '',
                    text: '',
                    isCorrect: false,
                    disable: false,
                },
            ];

            addNewSlide({
                tab: TAB_QUESTION,
                question: {
                    id: uuidv4(),
                    type: type,
                    text: '',
                    mode: 'single-field', //separate-box
                    answers: defaultTemplate,
                    explain: {
                        id: uuidv4(),
                        text: '',
                    },
                },
            });
            setOpenSlide({
                open: false,
                back: false,
            });
        },
        QaEndedOpen: (type) => {
            // (Tự luận / Mở)
            const defaultTemplate = [];

            addNewSlide({
                tab: TAB_QUESTION,
                question: {
                    id: uuidv4(),
                    type: type,
                    text: '',
                    mode: '', //separate-box
                    answers: defaultTemplate,
                    explain: {
                        id: uuidv4(),
                        text: '',
                    },
                },
            });
            setOpenSlide({
                open: false,
                back: false,
            });
        },
        QaPoll: (type) => {
            // (Tự luận / Mở)
            const defaultTemplate = [
                { id: uuidv4(), text: '', isCorrect: false, disable: false },
                { id: uuidv4(), text: '', isCorrect: false, disable: false },
                { id: uuidv4(), text: '', isCorrect: false, disable: false },
                { id: uuidv4(), text: '', isCorrect: false, disable: false },
                { id: uuidv4(), text: '', isCorrect: false, disable: true },
            ];

            addNewSlide({
                tab: TAB_QUESTION,
                question: {
                    id: uuidv4(),
                    type: type,
                    text: '',
                    mode: 'single', // multiple
                    answers: defaultTemplate,
                    explain: {
                        id: uuidv4(),
                        text: '',
                    },
                },
            });
            setOpenSlide({
                open: false,
                back: false,
            });
        },
    };

    const handleSelectSlideType = (type) => {
        const action = slideTypeActions[type];
        if (action) {
            action(type);
        } else {
            console.warn(`Unknown slide type: ${type}`);
        }
    };

    return (
        <div className={cx('slide-creator-section')}>
            <h2 className={cx('section-two-title')}>Create manually</h2>
            <div className={cx('section-group')}>
                {Utils.BUTTON_DATA.map((button, index) => (
                    <div key={index} style={{ marginBottom: '8px' }}>
                        <button className={cx('section-manualy')} onClick={() => handleSelectSlideType(button.type)}>
                            <span className={cx(button.bgClass)}>
                                <div className={cx(button.overlayClass)}></div>
                                {button.icon ? (
                                    <FontAwesomeIcon icon={button.icon} style={button.iconStyle} />
                                ) : (
                                    button.blank && <div className={cx('blank')}></div>
                                )}
                            </span>
                            <div className={cx('section-group-des')}>
                                <span>{button.text}</span>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QaSlide;
