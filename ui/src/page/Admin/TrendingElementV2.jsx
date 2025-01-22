import styles from './ContentElement.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const tags = [
    {
        img: 'https://picsum.photos/200',
        title: 'Numbers',
        activities: '779.3K activities',
        data: [
            {
                img: 'https://picsum.photos/50',
                title: 'Concepts in fractions',
                activities: '895 activities',
            },
            {
                img: 'https://picsum.photos/50',
                title: 'Operations on fractions',
                activities: '3.9K activities',
            },
            {
                img: 'https://picsum.photos/50',
                title: 'Factors and multiples',
                activities: '15.1K activities',
            },
        ],
    },
    {
        img: 'https://picsum.photos/100',
        title: 'Algebra',
        activities: '112.3K activities',
        data: [
            {
                img: 'https://picsum.photos/50',
                title: 'Algebraic expressions',
                activities: '22K activities',
            },
            {
                img: 'https://picsum.photos/50',
                title: 'Linear equations (one variable)',
                activities: '7.9K activities',
            },
            {
                img: 'https://picsum.photos/50',
                title: 'Linear inequalities',
                activities: '1.7K activities',
            },
        ],
    },
    {
        img: 'https://picsum.photos/100',
        title: 'Geometry',
        activities: '45.2K activities',
        data: [
            {
                img: 'https://picsum.photos/50',
                title: 'Linear equations (two variables)',
                activities: '6.6K activities',
            },
            {
                img: 'https://picsum.photos/50',
                title: 'Equation of a straight line',
                activities: '31K activities',
            },
        ],
    },
    {
        img: 'https://picsum.photos/100',
        title: 'Geometry',
        activities: '45.2K activities',
        data: [
            {
                img: 'https://picsum.photos/50',
                title: 'Linear equations (two variables)',
                activities: '6.6K activities',
            },
            {
                img: 'https://picsum.photos/50',
                title: 'Equation of a straight line',
                activities: '31K activities',
            },
        ],
    },
    {
        img: 'https://picsum.photos/100',
        title: 'Geometry',
        activities: '45.2K activities',
        data: [
            {
                img: 'https://picsum.photos/50',
                title: 'Linear equations (two variables)',
                activities: '6.6K activities',
            },
            {
                img: 'https://picsum.photos/50',
                title: 'Equation of a straight line',
                activities: '31K activities',
            },
        ],
    },
    {
        img: 'https://picsum.photos/100',
        title: 'Geometry',
        activities: '45.2K activities',
        data: [
            {
                img: 'https://picsum.photos/50',
                title: 'Linear equations (two variables)',
                activities: '6.6K activities',
            },
            {
                img: 'https://picsum.photos/50',
                title: 'Equation of a straight line',
                activities: '31K activities',
            },
        ],
    },
    {
        img: 'https://picsum.photos/100',
        title: 'Geometry',
        activities: '45.2K activities',
        data: [
            {
                img: 'https://picsum.photos/50',
                title: 'Linear equations (two variables)',
                activities: '6.6K activities',
            },
            {
                img: 'https://picsum.photos/50',
                title: 'Equation of a straight line',
                activities: '31K activities',
            },
        ],
    },
];

function TrendingElementV2() {
    return (
        <div className={cx('container')}>
            {tags.map((tag, index) => (
                <div key={index} className={cx('card')}>
                    <div style={{ display: 'flex' }}>
                        <img src={tag.img} alt={tag.title} className={cx('image')} />
                        <div className={cx('content')}>
                            <h3 className={cx('title-card')}>{tag.title}</h3>
                            <p className={cx('activities')}>{tag.activities}</p>
                        </div>
                    </div>

                    <div className={cx('sub-items')}>
                        {tag.data.map((item, idx) => (
                            <div key={idx} className={cx('sub-item')}>
                                <img src={item.img} alt={item.title} className={cx('sub-image')} />
                                <div className={cx('sub-content')}>
                                    <p className={cx('sub-title')}>{item.title}</p>
                                    <p className={cx('sub-activities')}>{item.activities}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TrendingElementV2;
