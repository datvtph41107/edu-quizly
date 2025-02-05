import { faListOl, faListUl, faSquareRootVariable } from '@fortawesome/free-solid-svg-icons';
import styles from './TextBar.module.scss';
import classNames from 'classnames/bind';
import TaskbarItem from '~/components/TaskbarItem/TaskbarItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function TextBar() {
    const data = [
        {
            title: 'Text',
            wrap: [
                {
                    type: 'h1',
                    content: 'Add a Heading',
                },
                {
                    type: 'body',
                    content: 'Add body text',
                },
            ],
        },
        {
            title: 'Lists',
            above: true,
            wrap: [
                {
                    icon: <FontAwesomeIcon icon={faListUl} />,
                    content: 'Bullets',
                },
                {
                    icon: <FontAwesomeIcon icon={faListOl} />,
                    content: 'Numbered',
                },
            ],
        },
        {
            title: 'Math equation',
            above: true,
            wrap: [
                {
                    icon: <FontAwesomeIcon icon={faSquareRootVariable} />,
                    content: 'Open math editor',
                },
            ],
        },
    ];
    return (
        <div className={cx('wrapper')}>
            {data.map((item, index) => (
                <div key={index} className={cx('container')}>
                    <h2 className={cx('title', { above: item.above })}>
                        <span>{item.title}</span>
                    </h2>
                    {item.wrap.map((t, idx) => (
                        <div key={idx}>
                            <TaskbarItem heading={t.type === 'h1'} leftIcon={t.icon && t.icon}>
                                {t.content}
                            </TaskbarItem>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default TextBar;
