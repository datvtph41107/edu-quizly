import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ContentElement.module.scss';
import classNames from 'classnames/bind';
import { faArrowTrendUp, faSchool } from '@fortawesome/free-solid-svg-icons';
import TrendingElementV2 from './TrendingElementV2';
import TrendingElement from './TrendingElement';

const cx = classNames.bind(styles);

const contens = [
    {
        title: 'Trending activities',
        icon: faArrowTrendUp,
        layer: false,
    },
    {
        title: 'Back-to-shool activities',
        icon: faSchool,
        layer: true,
    },
];

function ContentElement() {
    return (
        <div className={cx('wrapper')}>
            {contens.map((content, index) => (
                <div key={index}>
                    <div className={cx('title')}>
                        <span className={cx({ icon: content.layer })}>
                            <FontAwesomeIcon icon={content.icon} />
                        </span>
                        {content.title}
                    </div>
                    <div className={cx('element')}>{content.layer ? <TrendingElementV2 /> : <TrendingElement />}</div>
                </div>
            ))}
        </div>
    );
}

export default ContentElement;
