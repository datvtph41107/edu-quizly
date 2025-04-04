import classNames from 'classnames/bind';
import styles from './ListStyle.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListOl, faListUl } from '@fortawesome/free-solid-svg-icons';
import { useStateContext } from '~/context/ContextProvider';

const cx = classNames.bind(styles);

function ListStyle({ editor }) {
    const { setChangeEditorType, changeEditorType } = useStateContext();

    const handleChange = (type) => {
        if (type === 'orderedList') {
            editor.chain().focus().toggleOrderedList().run();
        } else if (type === 'bulletList') {
            editor.chain().focus().toggleBulletList().run();
        }
        setChangeEditorType((prev) => ({
            ...prev,
            orderedList: { active: editor.isActive('orderedList') },
            bulletList: { active: editor.isActive('bulletList') },
        }));
    };

    return (
        <>
            <div style={{ position: 'relative', marginLeft: '2px' }}>
                <button
                    onClick={() => handleChange('orderedList')}
                    className={cx('box-btn', {
                        active: changeEditorType['orderedList']?.active ?? editor?.isActive('orderedList'),
                    })}
                >
                    <div className={cx('box-btn-grap')}>
                        <FontAwesomeIcon icon={faListOl} />
                    </div>
                </button>
            </div>
            <div style={{ position: 'relative', marginLeft: '2px' }}>
                <button
                    onClick={() => handleChange('bulletList')}
                    className={cx('box-btn', {
                        active: changeEditorType['bulletList']?.active ?? editor?.isActive('bulletList'),
                    })}
                >
                    <div className={cx('box-btn-grap')}>
                        <FontAwesomeIcon icon={faListUl} />
                    </div>
                </button>
            </div>
        </>
    );
}

export default ListStyle;
