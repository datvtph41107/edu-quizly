import React from 'react';
import useStore from '~/features/store';
import { TAB_QUESTION } from '~/utils/Const';
import SlideTemplate from './SlideTemplate';
import QuestionTemplate from './QuestionTemplate';

function Presentation() {
    const {
        selectedSlideId,
        items,
        changeModeSetting,
        editors,
        updateAnswerCorrect,
        mouteAnswerDisplay,
        unmouteAnswerDisplay,
        registerEditor,
        updateEditorText,
        addedState,
    } = useStore();

    const selectedSlide = items.find((slide) => slide.id === selectedSlideId);
    console.log('Presentation', editors, selectedSlide);

    return selectedSlide.tab === TAB_QUESTION ? (
        <QuestionTemplate
            selectedSlide={selectedSlide}
            editors={editors}
            updateEditorText={updateEditorText}
            unmouteAnswerDisplay={unmouteAnswerDisplay}
            mouteAnswerDisplay={mouteAnswerDisplay}
            registerEditor={registerEditor}
            updateAnswerCorrect={updateAnswerCorrect}
            changeModeSetting={changeModeSetting}
            addedState={addedState}
        />
    ) : (
        <SlideTemplate selectedSlide={selectedSlide} />
    );
}

export default Presentation;
