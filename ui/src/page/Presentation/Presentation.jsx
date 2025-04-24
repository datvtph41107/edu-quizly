import React from 'react';
import styles from './Presentation.module.scss';
import classNames from 'classnames/bind';
import useStore from '~/features/store';
import { TAB_QUESTION } from '~/utils/Const';
import SlideTemplate from './SlideTemplate';
import QuestionTemplate from './QuestionTemplate';

const cx = classNames.bind(styles);

function Presentation() {
    const { selectedSlideId, items } = useStore();

    const selectedSlide = items.find((slide) => slide.id === selectedSlideId);

    return selectedSlide.tab === TAB_QUESTION ? (
        <QuestionTemplate selectedSlide={selectedSlide} />
    ) : (
        <SlideTemplate selectedSlide={selectedSlide} />
    );
}

export default Presentation;
