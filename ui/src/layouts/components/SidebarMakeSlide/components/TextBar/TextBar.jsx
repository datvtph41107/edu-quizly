import { faListOl, faListUl, faSquareRootVariable } from '@fortawesome/free-solid-svg-icons';
import styles from './TextBar.module.scss';
import classNames from 'classnames/bind';
import TaskbarItem from '~/components/TaskbarItem/TaskbarItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStore from '~/features/store';
import { TYPE_TEXT_HEADING, TYPE_TEXT_TAG } from '~/utils/Const';

const cx = classNames.bind(styles);

function TextBar() {
    const { selectedSlideId, addElementIntoSlide } = useStore();
    const data = [
        {
            title: 'Text',
            wrap: [
                {
                    type: 'h1',
                    content: 'Add a Heading',
                    onClick: () =>
                        addElementIntoSlide({
                            slideId: selectedSlideId,
                            element: {
                                x: 200,
                                y: 270,
                                width: 770,
                                height: 96,
                                placeholder: 'Enter Title here',
                                placeholderSize: 36,
                                type: TYPE_TEXT_TAG,
                                tab: TYPE_TEXT_HEADING,
                                html: '',
                            },
                        }),
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
                            <TaskbarItem heading={t.type === 'h1'} leftIcon={t.icon && t.icon} onClick={t.onClick}>
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
