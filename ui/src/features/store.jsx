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
    items: [
        // {
        //     id: slideDefault,
        //     type: 'slide-1',
        //     elements: [
        //         {
        //             id: 1231,
        //             transform: {
        //                 position: {
        //                     x: 700,
        //                     y: 400,
        //                 },
        //                 size: {
        //                     width: 125,
        //                     height: 125,
        //                 },
        //                 rotation: 0,
        //                 zIndex: 0,
        //             },
        //             data: {
        //                 html: 'TYPE....',
        //                 media: {
        //                     type: '',
        //                     url: '',
        //                 },
        //             },
        //             placeholder: 'Type...',
        //             placeholderSize: 36,
        //             type: 'rectangle',
        //             tab: TYPE_SHAPE,
        //             zIndex: 0,
        //         },
        //         // {
        //         //     id: 4561,
        //         //     transform: {
        //         //         position: {
        //         //             x: 400,
        //         //             y: 200,
        //         //         },
        //         //         size: {
        //         //             width: 125,
        //         //             height: 4,
        //         //         },
        //         //         rotation: 0,
        //         //         zIndex: 0,
        //         //     },
        //         //     data: {
        //         //         html: 'TYPE....',
        //         //         media: {
        //         //             type: '',
        //         //             url: '',
        //         //         },
        //         //     },
        //         //     placeholder: null,
        //         //     placeholderSize: 36,
        //         //     type: 'line',
        //         //     tab: TYPE_SHAPE,
        //         //     zIndex: 2,
        //         // },
        //         // {
        //         //     id: 6781,
        //         //     transform: {
        //         //         position: {
        //         //             x: 500,
        //         //             y: 0,
        //         //         },
        //         //         size: {
        //         //             width: 125,
        //         //             height: 50,
        //         //         },
        //         //         rotation: 0,
        //         //         zIndex: 0,
        //         //     },
        //         //     data: {
        //         //         html: 'TYPE....',
        //         //         media: {
        //         //             type: '',
        //         //             url: '',
        //         //         },
        //         //     },
        //         //     placeholder: 'Type...',
        //         //     placeholderSize: 36,
        //         //     type: 'arrow',
        //         //     tab: TYPE_SHAPE,
        //         //     zIndex: 3,
        //         // },
        //         {
        //             id: 7891,
        //             transform: {
        //                 position: {
        //                     x: 462,
        //                     y: 295,
        //                 },
        //                 size: {
        //                     width: 140,
        //                     height: 140,
        //                 },
        //                 rotation: 0,
        //                 zIndex: 1,
        //             },
        //             data: {
        //                 html: 'TYPE....',
        //                 media: {
        //                     type: '',
        //                     url: '',
        //                 },
        //             },
        //             placeholder: 'Type...',
        //             placeholderSize: 36,
        //             type: 'circle',
        //             tab: TYPE_SHAPE,
        //             zIndex: 1,
        //         },
        //         {
        //             id: 8101,
        //             transform: {
        //                 position: {
        //                     x: 500,
        //                     y: 0,
        //                 },
        //                 size: {
        //                     width: 125,
        //                     height: 125,
        //                 },
        //                 rotation: 0,
        //                 zIndex: 0,
        //             },
        //             data: {
        //                 html: 'TYPE....',
        //                 media: {
        //                     type: '',
        //                     url: '',
        //                 },
        //             },
        //             placeholder: 'Type...',
        //             placeholderSize: 36,
        //             type: 'star',
        //             tab: TYPE_SHAPE,
        //             zIndex: 5,
        //         },
        //         // {
        //         //     id: 9111,
        //         //     transform: {
        //         //         position: {
        //         //             x: 400,
        //         //             y: 100,
        //         //         },
        //         //         size: {
        //         //             width: 125,
        //         //             height: 125,
        //         //         },
        //         //         rotation: 0,
        //         //         zIndex: 0,
        //         //     },
        //         //     data: {
        //         //         html: 'TYPE....',
        //         //         media: {
        //         //             type: '',
        //         //             url: '',
        //         //         },
        //         //     },
        //         //     placeholder: 'Type...',
        //         //     placeholderSize: 36,
        //         //     type: 'triangle',
        //         //     tab: TYPE_SHAPE,
        //         //     zIndex: 6,
        //         // },
        //     ],
        // },
        // {
        //     id: 11111,
        //     type: 'slide-2',
        //     elements: [
        //         {
        //             id: 1231,
        //             transform: {
        //                 position: {
        //                     x: 120,
        //                     y: 75,
        //                 },
        //                 size: {
        //                     width: 770,
        //                     height: 96,
        //                 },
        //                 rotation: 0,
        //                 zIndex: 0,
        //             },
        //             data: {
        //                 html: 'TYPE....',
        //                 media: {
        //                     type: '',
        //                     url: '',
        //                 },
        //             },
        //             placeholder: 'Enter title here...',
        //             placeholderSize: 36,
        //             type: 'h1',
        //             tab: TYPE_TEXT,
        //             zIndex: 1,
        //         },
        //         {
        //             id: 1234,
        //             transform: {
        //                 position: {
        //                     x: 120,
        //                     y: 220,
        //                 },
        //                 size: {
        //                     width: 770,
        //                     height: 210,
        //                 },
        //                 rotation: 0,
        //                 zIndex: 0,
        //             },
        //             data: {
        //                 html: 'TYPE....',
        //                 media: {
        //                     type: '',
        //                     url: '',
        //                 },
        //             },
        //             placeholder: 'Enter title here...',
        //             placeholderSize: 36,
        //             type: 'body',
        //             tab: TYPE_TEXT,
        //             zIndex: 1,
        //         },
        //         // { id: 4561, x: 400, y: 0, width: 150, height: 100, content: 'Element 2', type: 'body', tab: TYPE_TEXT },
        //         // { id: 6781, x: 500, y: 0, width: 150, height: 100, content: 'Element 3', type: 'list-ul', tab: TYPE_TEXT },
        //         // {
        //         //     id: 7891,
        //         //     x: 500,
        //         //     y: 0,
        //         //     width: 150,
        //         //     height: 100,
        //         //     content: 'Element 4',
        //         //     type: 'list-number',
        //         //     tab: TYPE_TEXT,
        //         // },
        //     ],
        // },
    ],
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
                            html: '',
                            media: { type: '', url: '' },
                        },
                        placeholder: element.placeholder,
                        placeholderSize: element.placeholderSize,
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

    updatePositionBlock: (id, updatePosition) =>
        set((state) => {
            const updatedItems = state.items.map((slide) =>
                slide.id === state.selectedSlideId
                    ? {
                          ...slide,
                          elements: slide.elements.map((el) =>
                              el.id === id ? { ...el, transform: { ...el.transform, position: updatePosition } } : el,
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
