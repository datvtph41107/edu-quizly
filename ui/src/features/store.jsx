import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const slideDefault = 1;

const useStore = create((set) => ({
    selectedElements: [],
    getBoundingElements: [],
    elementId: null,
    selectedId: slideDefault,
    items: [
        {
            id: slideDefault,
            type: 'slide-1',
            elements: [
                {
                    id: 1231,
                    x: 700,
                    y: 400,
                    width: 125,
                    height: 125,
                    content: 'Element 1',
                    textPreview: 'Type...',
                    type: 'block',
                    tab: 'shape',
                    editor: {},
                },
                {
                    id: 4561,
                    x: 400,
                    y: 200,
                    width: 125,
                    height: 4,
                    content: 'Element 2',
                    textPreview: null,
                    type: 'line',
                    tab: 'shape',
                    editor: {},
                },
                {
                    id: 6781,
                    x: 500,
                    y: 0,
                    width: 125,
                    height: 50,
                    content: 'Element 3',
                    textPreview: 'Type...',
                    type: 'arrow',
                    tab: 'shape',
                    editor: {},
                },
                {
                    id: 7891,
                    x: 462,
                    y: 295,
                    width: 140,
                    height: 140,
                    content: 'Element 4',
                    textPreview: 'Type...',
                    type: 'circle',
                    tab: 'shape',
                    editor: {},
                },
                {
                    id: 8101,
                    x: 500,
                    y: 0,
                    width: 125,
                    height: 125,
                    content: 'Element 5',
                    textPreview: 'Type...',
                    type: 'star',
                    tab: 'shape',
                },
                {
                    id: 9111,
                    x: 400,
                    y: 100,
                    width: 125,
                    height: 125,
                    content: 'Element 6',
                    textPreview: 'Type...',
                    type: 'triangle',
                    tab: 'shape',
                    editor: {},
                },
            ],
        },
        {
            id: 11111,
            type: 'slide-2',
            elements: [
                {
                    id: 1231,
                    x: 120,
                    y: 75,
                    width: 770,
                    height: 96,
                    content: 'Enter title here...',
                    type: 'heading',
                    tab: 'text',
                    tag: 'h1',
                    editor: {},
                },
                // { id: 4561, x: 400, y: 0, width: 150, height: 100, content: 'Element 2', type: 'body', tab: 'text' },
                // { id: 6781, x: 500, y: 0, width: 150, height: 100, content: 'Element 3', type: 'list-ul', tab: 'text' },
                // {
                //     id: 7891,
                //     x: 500,
                //     y: 0,
                //     width: 150,
                //     height: 100,
                //     content: 'Element 4',
                //     type: 'list-number',
                //     tab: 'text',
                // },
            ],
        },
    ],
    elements: [], // loop of children items parent arr

    setSelectedSlide: (id) =>
        set(() => ({
            selectedId: id,
        })),

    setSelectElementId: (elementId) =>
        set(() => ({
            elementId: elementId,
        })),

    onSelect: (elementId, arrDf = false) =>
        set((state) => {
            const selectedElements = state.selectedElements;
            if (arrDf) {
                return { selectedElements: [] };
            }

            const elementIndex = selectedElements.indexOf(elementId);

            if (elementIndex > -1) {
                selectedElements.splice(elementIndex, 1);
            } else {
                selectedElements.push(elementId);
            }

            return { selectedElements: [...selectedElements] };
        }),

    updatePositionBlock: (id, updatePosition) =>
        set((state) => {
            const updatedItems = state.items.map((slide) =>
                slide.id === state.selectedId
                    ? {
                          ...slide,
                          elements: slide.elements.map((el) => (el.id === id ? { ...el, ...updatePosition } : el)),
                      }
                    : slide,
            );

            return {
                items: updatedItems,
            };
        }),

    addNewSlide: (blankData) => set((state) => {}),

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
                selectedId: newSlideId,
            };
        }),

    removeSlide: (id) =>
        set((state) => {
            const updatedItems = state.items.filter((s) => s.id !== id);
            const index = state.items.findIndex((s) => s.id === id); // current index of item remove
            const isLastItemSelected = state.items[state.items.length - 1]?.id === id; // Check if the current element is last item in arr
            let targetSlide = state.selectedId;

            if (state.items.length === 1) {
                targetSlide = null;
            } else if (id === state.selectedId && isLastItemSelected) {
                targetSlide = updatedItems[updatedItems.length - 1]?.id;
            } else if (id === state.selectedId) {
                targetSlide = state.items[index + 1]?.id || updatedItems[0]?.id;
            }

            return {
                items: updatedItems,
                selectedId: targetSlide,
            };
        }),
}));

export default useStore;
