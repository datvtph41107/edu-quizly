import React, { useState } from 'react';
import Modal from 'react-modal'; // Import react-modal
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import style from './ModalLink.module.scss';

const cx = classNames.bind(style);

const ModalLink = ({ isOpen, onRequestClose, onSave }) => {
    const [link, setLink] = useState('');

    const handleSave = () => {
        if (link) {
            onSave(link);
            setLink('');
            onRequestClose();
        }
    };
    const customModalStyles = {
        content: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            padding: '16px',
            maxWidth: '480px',
            maxHeight: '200px',
            margin: 'auto',
            border: '1px solid #ccc',
            zIndex: '9999999999',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '9999999999',
        },
    };

    return (
        <Modal
            appElement={document.getElementById('root')}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Insert Link"
            style={customModalStyles} // Áp dụng style tùy chỉnh
        >
            <div className={cx('group-head')}>
                <div className={cx('group-icon')}>
                    <FontAwesomeIcon icon={faLink} />
                </div>
                <div className={cx('group-contain')}>
                    <h2>Insert Link</h2>
                    <span>Get link any web into your slide</span>
                </div>
            </div>
            <div>
                <span style={{ fontSize: '14px', color: 'rgb(94, 93, 93)' }}>Link:</span>
                <div style={{ position: 'relative' }}>
                    <div className={cx('input-icon')}>
                        <FontAwesomeIcon icon={faLink} />
                    </div>
                    <input
                        className={cx('input')}
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="for example: quizizz.com"
                    />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button outline className={cx('btn', 'outline')} onClick={onRequestClose}>
                    Cancel
                </Button>
                <Button className={cx('btn', 'pr')} onClick={handleSave}>
                    Save
                </Button>
            </div>
        </Modal>
    );
};

export default ModalLink;
