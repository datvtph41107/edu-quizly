import React from 'react';
import useStore from '~/features/store';
import { TAB_QUESTION } from '~/utils/Const';
import SlideTemplate from './SlideTemplate';
import QuestionTemplate from './QuestionTemplate';
import HiddenQuestionTemplate from './QuestionTemplate/HiddenQuestionTemplate';

function Presentation() {
    const { selectedSlideId, items, editors, registerEditor } = useStore();

    console.log(editors, items);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {items.map((slide) => {
                const isSelected = slide.id === selectedSlideId;
                return (
                    <React.Fragment key={slide.id}>
                        {isSelected ? (
                            <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                                {slide.tab === TAB_QUESTION ? (
                                    <QuestionTemplate
                                        selectedSlide={slide}
                                        editors={editors}
                                        registerEditor={registerEditor}
                                    />
                                ) : (
                                    <SlideTemplate selectedSlide={slide} />
                                )}
                            </div>
                        ) : (
                            <HiddenQuestionTemplate slide={slide} editors={editors} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default Presentation;
