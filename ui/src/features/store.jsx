import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const slideDefault = 1;

const useStore = create((set) => ({
    selectedId: slideDefault,
    items: [
        {
            id: slideDefault,
            type: 'block',
            elements: [
                { id: 123, x: 800, y: 500, width: 150, height: 100, content: 'Element 1' },
                { id: 456, x: 500, y: 0, width: 150, height: 100, content: 'Element 2' },
            ],
        },
    ],
    elements: [], // loop of children items parent arr

    setSelectedSlide: (id) =>
        set(() => ({
            selectedId: id,
        })),

    updatePositionBlock: (id, updatePosition) =>
        set((state) => {
            // state.selectedId state was saved before
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
