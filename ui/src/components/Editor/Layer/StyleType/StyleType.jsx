import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './StyleType.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBold,
    faFlorinSign,
    faItalic,
    faLink,
    faStrikethrough,
    faSubscript,
    faSuperscript,
    faUnderline,
} from '@fortawesome/free-solid-svg-icons';
import { useStateContext } from '~/context/ContextProvider';

const cx = classNames.bind(styles);

function StyleType({ editor, elementId, fn }) {
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);

    const handleBoldClick = () => {
        const newBold = !isBold;
        setIsBold(newBold);
        editor.chain().focus().toggleBold().run();
        // fn(elementId, { fontWeight: newBold ? 'bold' : 'normal' });
    };

    const handleItalicClick = () => {
        const newItalic = !isItalic;
        setIsItalic(newItalic);
        editor.chain().focus().toggleItalic().run();
    };

    const handleUnderlineClick = () => {
        const newUnderline = !isUnderline;
        setIsUnderline(newUnderline);
        fn(elementId, { textDecoration: newUnderline ? 'underline' : 'none' });
    };

    const handleStrikethroughClick = () => {
        const newStrikethrough = !isStrikethrough;
        setIsStrikethrough(newStrikethrough);
        fn(elementId, { textDecoration: newStrikethrough ? 'line-through' : 'none' });
    };

    return (
        <>
            <div style={{ position: 'relative' }}>
                {/* Bold Button */}
                <button className={cx('box-btn', { active: isBold })} onClick={handleBoldClick}>
                    <div className={cx('box-btn-grap')}>
                        <FontAwesomeIcon icon={faBold} />
                    </div>
                </button>
            </div>
            <div style={{ position: 'relative', marginLeft: '2px' }}>
                {/* Italic Button */}
                <button className={cx('box-btn', { active: isItalic })} onClick={handleItalicClick}>
                    <div className={cx('box-btn-grap')}>
                        <FontAwesomeIcon icon={faItalic} />
                    </div>
                </button>
            </div>
            <div style={{ position: 'relative', marginLeft: '2px' }}>
                {/* Underline Button */}
                <button className={cx('box-btn', { active: isUnderline })} onClick={handleUnderlineClick}>
                    <div className={cx('box-btn-grap')}>
                        <FontAwesomeIcon icon={faUnderline} />
                    </div>
                </button>
            </div>
            <div style={{ position: 'relative', marginLeft: '2px' }}>
                {/* Strikethrough Button */}
                <button className={cx('box-btn', { active: isStrikethrough })} onClick={handleStrikethroughClick}>
                    <div className={cx('box-btn-grap')}>
                        <FontAwesomeIcon icon={faStrikethrough} />
                    </div>
                </button>
            </div>
            <div style={{ position: 'relative', marginLeft: '2px' }}>
                {/* Superscript Button */}
                <button className={cx('box-btn')}>
                    <div className={cx('box-btn-grap')}>
                        <FontAwesomeIcon icon={faSuperscript} />
                    </div>
                </button>
            </div>
            <div style={{ position: 'relative', marginLeft: '2px' }}>
                {/* Subscript Button */}
                <button className={cx('box-btn')}>
                    <div className={cx('box-btn-grap')}>
                        <FontAwesomeIcon icon={faSubscript} />
                    </div>
                </button>
            </div>
            <div style={{ position: 'relative', marginLeft: '2px' }}>
                {/* Link Button */}
                <button className={cx('box-btn')}>
                    <div className={cx('box-btn-grap')}>
                        <FontAwesomeIcon icon={faLink} />
                    </div>
                </button>
            </div>
            <div style={{ position: 'relative', marginLeft: '2px' }}>
                {/* Florin Button */}
                <button className={cx('box-btn')}>
                    <div className={cx('box-btn-grap')}>
                        <FontAwesomeIcon icon={faFlorinSign} />
                    </div>
                </button>
            </div>
        </>
    );
}

export default StyleType;
