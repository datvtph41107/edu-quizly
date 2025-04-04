import React, { useCallback, useState } from 'react';
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
import { handleChangeTypeEditor } from '~/components/ElementTypes/ElementTypes';
import ModalLink from './ModalLink';

const cx = classNames.bind(styles);

function StyleType({ editor }) {
    const { setChangeEditorType, changeEditorType } = useStateContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    // console.log(changeEditorType);
    const handleSaveLink = useCallback(
        (url) => {
            // cancelled
            if (url === null) {
                return;
            }

            if (url === '') {
                editor.chain().focus().extendMarkRange('link').unsetLink().run();
                return;
            }
            const isSelectionEmpty = editor.state.selection.empty;
            try {
                if (isSelectionEmpty) {
                    editor
                        .chain()
                        .focus()
                        .insertContent(`<a href="${url}" className={cx('link-href')}>${url}</a>`)
                        .run();
                } else {
                    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                }
            } catch (e) {
                alert(e.message);
            }
        },
        [editor],
    );

    if (!editor) {
        return null;
    }

    const handleOpenLink = () => {
        setIsModalOpen(true);
    };

    const handleBoldClick = () => {
        handleChangeTypeEditor({ editor: editor, type: 'bold', setChangeEditorType: setChangeEditorType });
    };

    const handleItalicClick = () => {
        handleChangeTypeEditor({ editor: editor, type: 'italic', setChangeEditorType: setChangeEditorType });
    };

    const handleUnderlineClick = () => {
        handleChangeTypeEditor({ editor: editor, type: 'underline', setChangeEditorType: setChangeEditorType });
    };

    const handleStrikethroughClick = () => {
        handleChangeTypeEditor({ editor: editor, type: 'strike', setChangeEditorType: setChangeEditorType });
    };

    const handleSuperscriptClick = () => {
        handleChangeTypeEditor({ editor: editor, type: 'superscript', setChangeEditorType: setChangeEditorType });
    };

    const handleSubscriptClick = () => {
        handleChangeTypeEditor({ editor: editor, type: 'subscript', setChangeEditorType: setChangeEditorType });
    };

    return (
        <>
            <div style={{ position: 'relative' }}>
                {/* Bold Button */}
                <button
                    className={cx('box-btn', { active: changeEditorType['bold']?.active ?? editor.isActive('bold') })}
                    onClick={handleBoldClick}
                >
                    <div className={cx('box-btn-grap')}>
                        <FontAwesomeIcon icon={faBold} />
                    </div>
                </button>
            </div>
            <div style={{ position: 'relative', marginLeft: '2px' }}>
                {/* Italic Button */}
                <button
                    className={cx('box-btn', {
                        active: changeEditorType['italic']?.active ?? editor.isActive('italic'),
                    })}
                    onClick={handleItalicClick}
                >
                    <div className={cx('box-btn-grap')}>
                        <FontAwesomeIcon icon={faItalic} />
                    </div>
                </button>
            </div>
            <div style={{ position: 'relative', marginLeft: '2px' }}>
                {/* Underline Button */}
                <button
                    className={cx('box-btn', {
                        active: changeEditorType['underline']?.active ?? editor.isActive('underline'),
                    })}
                    onClick={handleUnderlineClick}
                >
                    <div className={cx('box-btn-grap')}>
                        <FontAwesomeIcon icon={faUnderline} />
                    </div>
                </button>
            </div>
            <div style={{ position: 'relative', marginLeft: '2px' }}>
                {/* Strikethrough Button */}
                <button
                    className={cx('box-btn', {
                        active: changeEditorType['strike']?.active ?? editor.isActive('strike'),
                    })}
                    onClick={handleStrikethroughClick}
                >
                    <div className={cx('box-btn-grap')}>
                        <FontAwesomeIcon icon={faStrikethrough} />
                    </div>
                </button>
            </div>
            <div style={{ position: 'relative', marginLeft: '2px' }}>
                {/* Superscript Button */}
                <button
                    className={cx('box-btn', {
                        active: changeEditorType['superscript']?.active ?? editor.isActive('superscript'),
                    })}
                    onClick={handleSuperscriptClick}
                >
                    <div className={cx('box-btn-grap')}>
                        <FontAwesomeIcon icon={faSuperscript} />
                    </div>
                </button>
            </div>
            <div style={{ position: 'relative', marginLeft: '2px' }}>
                {/* Subscript Button */}
                <button
                    className={cx('box-btn', {
                        active: changeEditorType['subscript']?.active ?? editor.isActive('subscript'),
                    })}
                    onClick={handleSubscriptClick}
                >
                    <div className={cx('box-btn-grap')}>
                        <FontAwesomeIcon icon={faSubscript} />
                    </div>
                </button>
            </div>
            <div style={{ position: 'relative', marginLeft: '2px' }}>
                {/* Link Button */}
                <button className={cx('box-btn')} onClick={handleOpenLink}>
                    <div className={cx('box-btn-grap')}>
                        <FontAwesomeIcon icon={faLink} />
                    </div>
                </button>
            </div>
            {/* START Modal */}
            <ModalLink isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} onSave={handleSaveLink} />
            {/* END Modal */}
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
