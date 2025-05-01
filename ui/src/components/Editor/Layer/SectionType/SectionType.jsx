import classNames from 'classnames/bind';
import styles from './SectionType.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faCaretUp, faSquareCheck, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const QUESTION_TYPES = [
    {
        icon: faSquareCheck,
        text: 'Multiple Choice',
        iconStyle: { fontSize: '16px', color: 'white' },
        type: 'QA_MULTIPLE_CHOICE',
    },
    {
        icon: null,
        text: 'Fill the Blank',
        iconStyle: null,
        blank: true,
        type: 'QA_INPUT_BLANK',
    },
    {
        icon: faAlignLeft,
        text: 'Open Ended',
        iconStyle: { fontSize: '16px', color: 'white' },
        type: 'QA_ENDED_OPEN',
    },
    {
        icon: faSquarePollVertical,
        text: 'Poll',
        iconStyle: { fontSize: '16px', color: 'white' },
        type: 'QA_POLL',
    },
];

function SectionType() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(QUESTION_TYPES[0]);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (type) => {
        setSelected(type);
        setIsOpen(false);
    };

    return (
        <div className={cx('section-type')}>
            <div className={cx('section-label')}>Question Type</div>
            <div className={cx('section-wrap')}>
                <button className={cx('section-dropdown')} onClick={toggleDropdown}>
                    <span className={cx('box')}>
                        {selected.icon ? (
                            <FontAwesomeIcon icon={selected.icon} style={selected.iconStyle} />
                        ) : (
                            selected.blank && <div className={cx('blank')}></div>
                        )}
                    </span>
                    <span className={cx('text')}>{selected.text}</span>

                    <div className={cx('section-dropdown-node', { open: isOpen })}>
                        <FontAwesomeIcon icon={faCaretUp} />
                    </div>
                </button>

                {isOpen && (
                    <div className={cx('dropdown-options')}>
                        {QUESTION_TYPES.map((type, idx) => (
                            <div
                                key={idx}
                                className={cx('dropdown-item', {
                                    selected: selected.label === type.text,
                                })}
                                onClick={() => handleSelect(type)}
                            >
                                <span className={cx('box')}>
                                    {type.icon ? (
                                        <FontAwesomeIcon icon={type.icon} style={type.iconStyle} />
                                    ) : (
                                        type.blank && <div className={cx('blank')}></div>
                                    )}
                                </span>
                                <span className={cx('text')}>{type.text}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SectionType;
