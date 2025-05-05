import classNames from 'classnames/bind';
import styles from './SectionTimming.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faClock } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const TIMINGS = [
    { label: '5 seconds', value: 5 },
    { label: '10 seconds', value: 10 },
    { label: '20 seconds', value: 20 },
    { label: '30 seconds', value: 30 },
    { label: '45 seconds', value: 45 },
    { label: '1 minute', value: 60 },
    { label: '1.5 minutes', value: 90 },
    { label: '2 minutes', value: 120 },
    { label: '3 minutes', value: 180 },
];

function SectionTiming() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(TIMINGS[5]); // Default: 1 minute

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (item) => {
        setSelected(item);
        setIsOpen(false);
        // Optional: store in zustand or callback
    };

    return (
        <div className={cx('section-type')}>
            <div className={cx('section-label')}>Time Limit</div>
            <div className={cx('section-wrap')}>
                <button className={cx('section-dropdown')} onClick={toggleDropdown}>
                    <span className={cx('box')}>
                        <FontAwesomeIcon icon={faClock} style={{ fontSize: '14px', color: 'black' }} />
                    </span>
                    <span className={cx('text')}>{selected.label}</span>

                    <div className={cx('section-dropdown-node', { open: isOpen })}>
                        <FontAwesomeIcon icon={faCaretUp} />
                    </div>
                </button>

                {isOpen && (
                    <div className={cx('dropdown-options')}>
                        {TIMINGS.map((item, idx) => (
                            <div
                                key={idx}
                                className={cx('dropdown-item', {
                                    selected: selected.value === item.value,
                                })}
                                onClick={() => handleSelect(item)}
                            >
                                <span className={cx('text')}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SectionTiming;
