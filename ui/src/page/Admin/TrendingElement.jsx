import React from 'react';
import styles from './TrendingElement.module.scss';
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import './swiper.css';
import 'swiper/css/navigation';
const cx = classNames.bind(styles);

const tags = [
    {
        img: 'https://picsum.photos/200',
        title: 'Numbers',
        activities: '779.3K activities',
        data: [
            {
                img: 'https://picsum.photos/200',
                title: 'Concepts in fractions',
                activities: '895 activities',
            },
            {
                img: 'https://picsum.photos/200',
                title: 'Operations on fractions',
                activities: '3.9K activities',
            },
            {
                img: 'https://picsum.photos/200',
                title: 'Factors and multiples',
                activities: '15.1K activities',
            },
            {
                img: 'https://picsum.photos/200',
                title: 'Factors and multiples',
                activities: '15.1K activities',
            },
            {
                img: 'https://picsum.photos/200',
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
                img: 'https://picsum.photos/200',
                title: 'Algebraic expressions',
                activities: '22K activities',
            },
            {
                img: 'https://picsum.photos/200',
                title: 'Linear equations (one variable)',
                activities: '7.9K activities',
            },
        ],
    },
];

function TrendingElement() {
    return (
        <div className={cx('container')}>
            {tags.map((tag, index) => (
                <div key={index} className={cx('context')}>
                    <div className={cx('card')}>
                        <img src={tag.img} alt={tag.title} className={cx('image')} />
                        <div className={cx('content')}>
                            <h3 className={cx('title-card')}>{tag.title}</h3>
                            <p className={cx('activities')}>{tag.activities}</p>
                        </div>
                    </div>
                    <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        spaceBetween={0}
                        slidesPerView={4}
                        className={cx('sub-items')}
                    >
                        {tag.data.map((item, idx) => (
                            <SwiperSlide key={idx}>
                                <div className={cx('sub-item')}>
                                    <img src={item.img} alt={item.title} className={cx('sub-image')} />
                                    <div className={cx('sub-content')}>
                                        <p className={cx('sub-title')}>{item.title}</p>
                                        <p className={cx('sub-activities')}>{item.activities}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ))}
        </div>
    );
}

export default TrendingElement;
