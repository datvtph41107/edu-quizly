import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCaretUp,
    faCaretDown,
    faArrowUpWideShort,
    faArrowUp,
    faArrowDownWideShort,
    faArrowDown,
    faCopy,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useStateContext } from '~/context/ContextProvider';
import useStore from '~/features/store';

const cx = classNames.bind(styles);
const control = [
    {
        id: 1,
        icon: faArrowUpWideShort,
        text: 'Bring forward',
        control: {
            text: 'Ctrl + ',
            icon: faArrowUp,
        },
    },
    {
        id: 2,
        icon: faArrowDownWideShort,
        text: 'Send backward',
        control: {
            text: 'Ctrl + ',
            icon: faArrowDown,
        },
    },
    {
        id: 3,
        icon: faCopy,
        text: 'Bring forward',
        control: {
            text: 'Ctrl + Shift + ',
            icon: faArrowUp,
        },
    },
    {
        id: 4,
        icon: faCopy,
        text: 'Send to back',
        control: {
            text: 'Ctrl + Shift + ',
            icon: faArrowDown,
        },
    },
];

function Order({ editor }) {
    const { selectedElements, updateOrderZIndexTransform, items } = useStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const elementId = selectedElements?.element?.id;

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleOrderChange = (id) => {
        switch (id) {
            case 1:
                // editor.commands.bringForward();
                updateOrderZIndexTransform(elementId, 'above');
                break;
            case 2:
                // editor.commands.bringForward();
                updateOrderZIndexTransform(elementId, 'below');
                break;
            case 3:
                editor.commands.bringForward(selectedElements);
                break;
            case 4:
                editor.commands.sendBack();
                break;
            default:
                break;
        }
        setIsDropdownOpen(false);
    };

    return (
        <div className={cx('section-family', 'w-20')}>
            <div className={cx('section-wrap')}>
                <button type="button" className={cx('section-dropdown')} onClick={toggleDropdown}>
                    <span>Order</span>
                    <div className={cx('section-dropdown-node', { open: isDropdownOpen })}>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                </button>
                {isDropdownOpen && (
                    <div className={cx('dropdown-options')}>
                        {control.map((data, index) => (
                            <div key={index} className={cx('dropdown-item')} onClick={() => handleOrderChange(data.id)}>
                                <div className={cx('dropdown-item-group')}>
                                    <div className={cx('dropdown-item-icon')}>
                                        <FontAwesomeIcon icon={data.icon} />{' '}
                                    </div>
                                    <div className={cx('dropdown-item-name')}>{data.text}</div>
                                </div>
                                <div className={cx('dropdown-item-control')}>
                                    {data.control.text} <FontAwesomeIcon icon={data.control.icon} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Order;
