import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { SLIDE_PRESENTATION, TAB_SLIDE } from '~/utils/Const';

const slideDefault = 1;

const useStore = create((set, get) => ({
    editors: {},
    errors: {
        questions: {}, // { [questionId]: boolean }
        answers: {}, // { [answerId]: boolean }
    },
    selectedElements: [], // elements
    selectedQuestionAnswers: [], // question
    selectedSlideId: slideDefault,
    items: [],
    addedState: false,

    setSelectedSlide: (id) =>
        set(() => ({
            selectedSlideId: id,
        })),

    registerEditor: (id, editor) =>
        set((state) => ({
            editors: { ...state.editors, [id]: editor },
        })),

    addNewSlide: (params = {}) => {
        const { type = SLIDE_PRESENTATION, tab = TAB_SLIDE, element = [], question = {} } = params;

        set((state) => {
            const id = uuidv4();
            const newSlide = {
                id: id,
                type,
                tab,
                elements: element,
                question,
            };
            return {
                items: [...state.items, newSlide],
                selectedSlideId: id,
                addedState: true,
            };
        });
    },

    copyNewSlide: (id) =>
        set((state) => {
            /**
             * handle duplicate new item of items array
             * Apperance below of item was copied
             * After duplication, the new item is selected.
             */
            const slideCopied = state.items.find((slide) => slide.id === id);
            if (!slideCopied) return state;
            const newSlideId = uuidv4();
            const duplicateSlide = {
                // copy slide with id
                ...slideCopied,
                id: newSlideId,
                elements: slideCopied.elements.map((el) => ({
                    ...el,
                    id: uuidv4(),
                })),
                question: {
                    ...slideCopied.question,
                    id: uuidv4(),
                    answers: slideCopied.question?.answers?.map((ans) => ({
                        ...ans,
                        id: uuidv4(),
                    })),
                },
            };
            const index = state.items.findIndex((s) => s.id === id); // find index inside items array
            const updatedItems = [...state.items.slice(0, index + 1), duplicateSlide, ...state.items.slice(index + 1)]; // index + 1 if = 2 get array -> last past
            return {
                items: updatedItems,
                selectedSlideId: newSlideId,
                addedState: id,
            };
        }),

    removeSlide: (id) =>
        set((state) => {
            const slideToRemove = state.items.find((s) => s.id === id);
            if (!slideToRemove) return state;

            const updatedItems = state.items.filter((s) => s.id !== id);
            const index = state.items.findIndex((s) => s.id === id);
            const isLastItemSelected = state.items[state.items.length - 1]?.id === id;
            let targetSlide = state.selectedSlideId;

            if (state.items.length === 1) {
                targetSlide = null;
            } else if (id === state.selectedSlideId && isLastItemSelected) {
                targetSlide = updatedItems[updatedItems.length - 1]?.id;
            } else if (id === state.selectedSlideId) {
                targetSlide = state.items[index + 1]?.id || updatedItems[0]?.id;
            }

            const editors = { ...state.editors };

            if (slideToRemove.question?.id) {
                delete editors[slideToRemove.question.id];
            }

            if (slideToRemove.question?.answers?.length) {
                slideToRemove.question.answers.forEach((ans) => {
                    delete editors[ans.id];
                });
            }

            return {
                items: updatedItems,
                selectedSlideId: targetSlide,
                editors,
            };
        }),

    // **** START - QUESTION ANSWERS SLIDE STATE
    validateQuestionAndAnswers: (questionId, answers) => {
        const { errors } = get();

        const question_empty = errors.questions?.[questionId] !== false;
        const validAnswerCount = answers
            .filter((a) => !a.disable)
            .filter((a) => errors.answers?.[a.id] === false).length;
        const answers_empty = validAnswerCount < 2;

        return {
            question_empty,
            answers_empty,
            isValid: !question_empty && !answers_empty,
            messages: {
                question: question_empty ? 'Please enter a question' : null,
                answers: answers_empty ? 'Add at least two options' : null,
            },
        };
    },

    updateQuestionText: (questionId, text, isEmpty) =>
        set((state) => {
            const updatedItems = state.items.map((slide) => {
                if (!slide.question || slide.question.id !== questionId) return slide;

                return {
                    ...slide,
                    question: {
                        ...slide.question,
                        text: text,
                    },
                };
            });

            return {
                items: updatedItems,
                errors: {
                    ...state.errors,
                    questions: {
                        ...state.errors.questions,
                        [questionId]: isEmpty,
                    },
                },
            };
        }),

    updateAnswerText: (answerId, text, isEmpty) =>
        set((state) => {
            const updatedItems = state.items.map((slide) => {
                if (!slide.question || !slide.question.answers) return slide;

                const updatedAnswers = slide.question.answers.map((ans) =>
                    ans.id === answerId ? { ...ans, text: text } : ans,
                );

                return {
                    ...slide,
                    question: {
                        ...slide.question,
                        answers: updatedAnswers,
                    },
                };
            });

            return {
                items: updatedItems,
                errors: {
                    ...state.errors,
                    answers: {
                        ...state.errors.answers,
                        [answerId]: isEmpty,
                    },
                },
            };
        }),

    updateAnswerCorrect: (answerId, isEmpty = false) =>
        set((state) => {
            const { items, selectedSlideId } = state;

            const updatedItems = items.map((slide) => {
                if (slide.id !== selectedSlideId || !slide.question?.answers) return slide;

                const isSingleMode = slide.question.mode === 'single';
                const currentAnswers = slide.question.answers;

                if (isSingleMode) {
                    const updatedAnswers = currentAnswers.map((ans) => {
                        if (ans.id === answerId) {
                            return {
                                ...ans,
                                isCorrect: isEmpty ? false : !ans.isCorrect,
                            };
                        }
                        return { ...ans, isCorrect: false };
                    });

                    return {
                        ...slide,
                        question: {
                            ...slide.question,
                            answers: updatedAnswers,
                        },
                    };
                } else {
                    const clickedAnswer = currentAnswers.find((ans) => ans.id === answerId);
                    const correctCount = currentAnswers.filter((ans) => ans.isCorrect).length;

                    const updatedAnswers = currentAnswers.map((ans) => {
                        if (ans.id !== answerId) return ans;

                        if (clickedAnswer.isCorrect) {
                            return { ...ans, isCorrect: false };
                        }

                        if (!clickedAnswer.isCorrect && correctCount >= 2) {
                            return ans;
                        }

                        return { ...ans, isCorrect: true };
                    });

                    return {
                        ...slide,
                        question: {
                            ...slide.question,
                            answers: updatedAnswers,
                        },
                    };
                }
            });

            return { items: updatedItems };
        }),

    changeModeSetting: (mode) =>
        set((state) => {
            const { items, selectedSlideId } = state;

            const updatedItems = items.map((slide) => {
                if (slide.id !== selectedSlideId) return slide;

                let updatedAnswers = slide.question.answers;

                if (mode === 'single') {
                    const firstCorrect = updatedAnswers.find((ans) => ans.isCorrect);
                    updatedAnswers = updatedAnswers.map((ans) => ({
                        ...ans,
                        isCorrect: ans.id === firstCorrect?.id,
                    }));
                }

                return {
                    ...slide,
                    question: {
                        ...slide.question,
                        mode,
                        answers: updatedAnswers,
                    },
                };
            });

            return {
                items: updatedItems,
            };
        }),

    mouteAnswerDisplay: (answersTemplate) =>
        set((state) => {
            // answersTemplate is element of items was selected slide before
            const { items } = state;
            // console.log('Before', items);
            for (let i = answersTemplate.length - 1; i >= 0; i--) {
                if (answersTemplate[i].disable) {
                    answersTemplate[i] = { ...answersTemplate[i], disable: false };
                    break;
                }
            }
            // console.log('After', items);

            const updatedItems = items.map((slide) => slide);
            return { items: updatedItems };
        }),

    unmouteAnswerDisplay: (qaId, isDisplay) =>
        set((state) => {
            const updatedItems = state.items.map((slide) => {
                if (slide.id !== state.selectedSlideId) return slide;

                const updatedAnswers = slide.question.answers.map((answer, index, arr) => {
                    if (isDisplay === 'init' && index === arr.length - 1) {
                        return { ...answer, disable: false };
                    }
                    if (answer.id === qaId) {
                        return { ...answer, disable: !isDisplay };
                    }
                    return answer;
                });

                return {
                    ...slide,
                    question: {
                        ...slide.question,
                        answers: updatedAnswers,
                    },
                };
            });

            return { items: updatedItems };
        }),

    // **** END - QUESTION ANSWERS SLIDE STATE

    // **** START - ELEMENT DRAG SLIDE STATE

    onSelect: ({ elementData, arrDf = false, only = false }) =>
        set((state) => {
            if (Array.isArray(elementData) || (elementData.length === 0 && only)) {
                return { selectedElements: [] };
            }
            const selectedElements = state.selectedElements;
            if (arrDf) {
                return { selectedElements: [] };
            }
            if (only) {
                return { selectedElements: elementData };
            }
            const elementIndex = selectedElements.findIndex((el) => el.id === elementData.id);

            if (elementIndex > -1) {
                selectedElements.splice(elementIndex, 1);
            } else {
                selectedElements.push(elementData);
            }

            return { selectedElements: [...selectedElements] };
        }),

    addElementIntoSlide: ({ slideId, element }) =>
        set((state) => {
            console.log(element.html);

            const updatedItems = state.items.map((slide) => {
                if (slide.id === slideId) {
                    const nextZIndex = slide.elements.length;
                    const newElement = {
                        id: uuidv4(),
                        transform: {
                            position: { x: element.x, y: element.y },
                            size: { width: element.width, height: element.height },
                            rotation: 0,
                            zIndex: nextZIndex,
                        },
                        data: {
                            html: element.html,
                            media: { type: '', url: '' },
                        },
                        placeholder: element.placeholder,
                        placeholderSize: element.placeholderSize,
                        borderSize: element.borderSize ?? '',
                        borderColor: element.borderColor ?? '',
                        backgroundColor: element.backgroundColor ?? '', //shape
                        type: element.type,
                        tab: element.tab,
                        lock: false,
                        zIndex: nextZIndex,
                    };

                    return {
                        ...slide,
                        elements: [...slide.elements, newElement],
                    };
                }
                return slide;
            });

            return {
                items: updatedItems,
            };
        }),

    updateElementBorderSize: ({ slideId, elementId, borderSize }) =>
        set((state) => {
            const updatedItems = state.items.map((slide) => {
                if (slide.id !== slideId) return slide;

                const updatedElements = slide.elements.map((el) => (el.id === elementId ? { ...el, borderSize } : el));

                return { ...slide, elements: updatedElements };
            });

            return { items: updatedItems };
        }),

    updateElementBorderColor: ({ slideId, elementId, borderColor }) =>
        set((state) => {
            const updatedItems = state.items.map((slide) => {
                if (slide.id !== slideId) return slide;

                const updatedElements = slide.elements.map((el) => (el.id === elementId ? { ...el, borderColor } : el));

                return { ...slide, elements: updatedElements };
            });

            return { items: updatedItems };
        }),

    updateElementBackgroundColor: ({ slideId, elementId, backgroundColor }) =>
        set((state) => {
            const updatedItems = state.items.map((slide) => {
                if (slide.id !== slideId) return slide;

                const updatedElements = slide.elements.map((el) =>
                    el.id === elementId ? { ...el, backgroundColor } : el,
                );

                return { ...slide, elements: updatedElements };
            });

            return { items: updatedItems };
        }),

    updateOrderZIndexTransform: (elementId, type) =>
        set((state) => {
            const updatedItems = state.items.map((slide) => ({
                ...slide,
                elements: slide.elements.map((el) =>
                    el.id === elementId
                        ? {
                              ...el,
                              zIndex: Math.max(0, (el.zIndex || 0) + (type === 'above' ? 1 : -1)),
                              transform: {
                                  ...el.transform,
                                  zIndex: Math.max(0, (el.transform?.zIndex || 0) + (type === 'above' ? 1 : -1)),
                              },
                          }
                        : el,
                ),
            }));

            return { items: updatedItems };
        }),

    updateElementHtml: ({ elementId, html }) =>
        set((state) => {
            const updatedItems = state.items.map((slide) => ({
                ...slide,
                elements: slide.elements.map((el) =>
                    el.id === elementId
                        ? {
                              ...el,
                              data: {
                                  ...el.data,
                                  html,
                              },
                          }
                        : el,
                ),
            }));

            return { items: updatedItems };
        }),

    updateElementLock: (elementId, lock) =>
        set((state) => {
            const updatedItems = state.items.map((slide) => ({
                ...slide,
                elements: slide.elements.map((el) =>
                    el.id === elementId
                        ? {
                              ...el,
                              lock: lock,
                          }
                        : el,
                ),
            }));

            return { items: updatedItems };
        }),

    removeElement: (elementId) =>
        set((state) => {
            const updatedItems = state.items.map((slide) => {
                if (slide.id !== state.selectedSlideId) return slide;

                return {
                    ...slide,
                    elements: slide.elements.filter((el) => el.id !== elementId),
                };
            });

            return { items: updatedItems };
        }),

    duplicateElement: (elementId) =>
        set((state) => {
            const updatedItems = state.items.map((slide) => {
                if (slide.id !== state.selectedSlideId) return slide;

                const elementToCopy = slide.elements.find((el) => el.id === elementId);
                if (!elementToCopy) return slide;

                const newElement = {
                    ...elementToCopy,
                    id: uuidv4(),
                    transform: {
                        ...elementToCopy.transform,
                        position: {
                            x: elementToCopy.transform.position.x + 20,
                            y: elementToCopy.transform.position.y + 20,
                        },
                        zIndex: slide.elements.length,
                    },
                    zIndex: slide.elements.length,
                };

                return {
                    ...slide,
                    elements: [...slide.elements, newElement],
                };
            });

            return { items: updatedItems };
        }),

    updateElementSize: ({ elementId, size }) =>
        set((state) => {
            const updatedItems = state.items.map((slide) => {
                if (slide.id !== state.selectedSlideId) return slide;

                const updatedElements = slide.elements.map((el) =>
                    el.id === elementId
                        ? {
                              ...el,
                              transform: {
                                  ...el.transform,
                                  size: {
                                      width: size.width ?? el.transform.size.width,
                                      height: size.height ?? el.transform.size.height,
                                  },
                              },
                          }
                        : el,
                );

                return { ...slide, elements: updatedElements };
            });

            return { items: updatedItems };
        }),

    updatePositionBlock: (id, updatePosition, updateSize) =>
        set((state) => {
            const updatedItems = state.items.map((slide) =>
                slide.id === state.selectedSlideId
                    ? {
                          ...slide,
                          elements: slide.elements.map((el) =>
                              el.id === id
                                  ? {
                                        ...el,
                                        transform: {
                                            ...el.transform,
                                            position: updatePosition || el.transform.position,
                                            size: updateSize || el.transform.size,
                                        },
                                    }
                                  : el,
                          ),
                      }
                    : slide,
            );

            return {
                items: updatedItems,
            };
        }),

    // **** END - ELEMENT DRAG SLIDE STATE
}));

export default useStore;
