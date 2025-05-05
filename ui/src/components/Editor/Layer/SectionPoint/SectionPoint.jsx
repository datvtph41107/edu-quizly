import classNames from 'classnames/bind';
import styles from './SectionPoint.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const POINT_OPTIONS = [
    { label: '1 point', value: 1 },
    { label: '2 points', value: 2 },
    { label: '3 points', value: 3 },
    { label: '4 points', value: 4 },
    { label: '5 points', value: 5 },
    { label: '6 points', value: 6 },
];

function SectionPoint() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(POINT_OPTIONS[0]);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (item) => {
        setSelected(item);
        setIsOpen(false);
        // TODO: Store selected point if needed
    };

    return (
        <div className={cx('section-type')}>
            <div className={cx('section-label')}>Points</div>
            <div className={cx('section-wrap')}>
                <button className={cx('section-dropdown')} onClick={toggleDropdown}>
                    <span className={cx('box')}>
                        <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: '14px', color: 'black' }} />
                    </span>
                    <span className={cx('text')}>{selected.label}</span>

                    <div className={cx('section-dropdown-node', { open: isOpen })}>
                        <FontAwesomeIcon icon={faCaretUp} />
                    </div>
                </button>

                {isOpen && (
                    <div className={cx('dropdown-options')}>
                        {POINT_OPTIONS.map((item, idx) => (
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

export default SectionPoint;
