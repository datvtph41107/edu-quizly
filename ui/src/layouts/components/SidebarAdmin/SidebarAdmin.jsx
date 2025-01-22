import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './SidebarAdmin.module.scss';
import Logo from '~/components/Logo';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChartPie, faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import SideItem from './SideItem';
import ModalCreate from './ModalCreate';

const cx = classNames.bind(style);

const items = [
    {
        icon: faHome,
        text: 'Explore',
    },
    {
        icon: faBook,
        text: 'Library',
    },
    {
        icon: faChartPie,
        text: 'Reports',
    },
];

function SidebarAdmin() {
    const [isModalOpen, setModalOpen] = useState(true);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isModalOpen]);

    const handleModalCreate = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('sidebar-main')}>
                    <div className={cx('contain')}>
                        <div className={cx('element')}>
                            <Logo title={'Student'} />
                            <Button
                                large
                                primary
                                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                                onClick={handleModalCreate}
                            >
                                Create
                            </Button>
                            <SideItem items={items} />
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && <ModalCreate onClose={handleCloseModal} isModalOpen={isModalOpen} />}
        </div>
    );
}

export default SidebarAdmin;
