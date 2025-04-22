import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { TYPE_SHAPE, TYPE_TEXT } from '~/utils/Const';

const slideDefault = 1;

const useStore = create((set) => ({
    editor: null,
    editors: {},
    selectedElements: [],
    getBoundingElements: [],
    elementId: null,
    selectedSlideId: slideDefault,
    items: [],
    elements: [], // loop of children items parent arr

    registerEditor: (id, editor) =>
        set((state) => ({
            editors: { ...state.editors, [id]: editor },
        })),

    setEditor: (editorInstance) => set({ editor: editorInstance }),

    setSelectedSlide: (id) =>
        set(() => ({
            selectedSlideId: id,
        })),

    setSelectElementId: (elementId) =>
        set(() => ({
            elementId: elementId,
        })),

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

    addNewSlide: () =>
        set((state) => {
            const id = uuidv4();
            const newSlide = {
                id: id,
                type: 'slide-' + id,
                elements: [],
            };
            return {
                items: [...state.items, newSlide],
                selectedSlideId: id,
            };
        }),

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
            };
            const index = state.items.findIndex((s) => s.id === id); // find index inside items array
            const updatedItems = [...state.items.slice(0, index + 1), duplicateSlide, ...state.items.slice(index + 1)]; // index + 1 if = 2 get array -> last past
            return {
                items: updatedItems,
                selectedSlideId: newSlideId,
            };
        }),

    removeSlide: (id) =>
        set((state) => {
            const updatedItems = state.items.filter((s) => s.id !== id);
            const index = state.items.findIndex((s) => s.id === id); // current index of item remove
            const isLastItemSelected = state.items[state.items.length - 1]?.id === id; // Check if the current element is last item in arr
            let targetSlide = state.selectedSlideId;

            if (state.items.length === 1) {
                targetSlide = null;
            } else if (id === state.selectedSlideId && isLastItemSelected) {
                targetSlide = updatedItems[updatedItems.length - 1]?.id;
            } else if (id === state.selectedSlideId) {
                targetSlide = state.items[index + 1]?.id || updatedItems[0]?.id;
            }

            return {
                items: updatedItems,
                selectedSlideId: targetSlide,
            };
        }),
}));

export default useStore;
