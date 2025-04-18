import { Extension } from '@tiptap/core';

export const BringForwardExtension = Extension.create({
    name: 'bringForward',
    addCommands() {
        return {
            bringForward:
                (element) =>
                ({ state, dispatch }) => {
                    const selectedElement = element.target;
                    if (selectedElement) {
                        selectedElement.style.zIndex = '9999';
                    }
                    return true;
                },
        };
    },
});

export const SendBackExtension = Extension.create({
    name: 'sendBack',

    addCommands() {
        return {
            sendBack:
                () =>
                ({ state, dispatch }) => {
                    const { selection, doc } = state;
                    const { from } = selection;
                    console.log(selection);
                    const node = doc.nodeAt(from);

                    if (node) {
                        const updatedNode = node.copy(node.content);

                        const tr = state.tr.setNodeMarkup(from, null, {
                            ...node.attrs,
                            style: 'z-index: -1;',
                        });

                        dispatch(tr);
                    }

                    return true;
                },
        };
    },
});

// const CustomTableHeader = TableHeader.extend({
//     addAttributes() {
//         return {
//             ...this.parent?.(),
//             customStyled: {
//                 default: true,
//                 renderHTML: () => {
//                     return {
//                         style: 'line-height: 1.5em; font-size: 24px; color: rgb(7, 10, 14); text-decoration-color: rgb(7, 10, 14)',
//                     };
//                 },
//             },
//         };
//     },

//     addContent() {
//         return '<span style="line-height: 1.5em; font-size: 24px; color: rgb(7, 10, 14); text-decoration-color: rgb(7, 10, 14)">​</span>';
//     },
// });

// const CustomTableCell = TableCell.extend({
//     addAttributes() {
//         return {
//             ...this.parent?.(),
//             customStyled: {
//                 default: true,
//                 renderHTML: () => {
//                     return {
//                         style: 'line-height: 1.5em; font-size: 24px; color: rgb(7, 10, 14); text-decoration-color: rgb(7, 10, 14)',
//                     };
//                 },
//             },
//         };
//     },

//     addContent() {
//         return '<span style="line-height: 1.5em; font-size: 24px; color: rgb(7, 10, 14); text-decoration-color: rgb(7, 10, 14)">​</span>';
//     },
// });

export const FontSize = Extension.create({
    name: 'fontSize',

    addOptions() {
        return {
            types: ['textStyle'],
            getStyle: (fontSize) => {
                return `font-size: ${fontSize}px`;
            },
        };
    },

    addGlobalAttributes() {
        // set mark với extension  commands.setMark('textStyle', { fontSize: 16, lineHeight: '1.5em' });
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: (element) => element.style.fontSize.replace(/['"]+/g, ''),
                        renderHTML: (attributes) => {
                            if (!attributes.fontSize) {
                                return {};
                            }

                            return {
                                style: this.options.getStyle(attributes.fontSize),
                            };
                        },
                    },
                    lineHeight: {
                        default: null,
                        parseHTML: (element) => element.style.lineHeight?.replace(/['"]+/g, '') || null,
                        renderHTML: (attributes) => {
                            if (!attributes.lineHeight) return {};
                            return {
                                style: `line-height: ${attributes.lineHeight}`,
                            };
                        },
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            setFontSize:
                (fontSize) =>
                ({ chain }) => {
                    return chain().setMark('textStyle', { fontSize }).run();
                },
            updateTextStyle:
                (attrs) =>
                ({ state, commands, chain }) => {
                    const { from, to, empty } = state.selection;
                    if (empty) return false;

                    let existingAttrs = {};
                    state.doc.nodesBetween(from, to, (node) => {
                        node.marks.forEach((mark) => {
                            if (mark.type.name === 'textStyle') {
                                existingAttrs = { ...existingAttrs, ...mark.attrs };
                            }
                        });
                    });

                    const merged = { ...existingAttrs, ...attrs };

                    chain().unsetMark('textStyle');

                    return chain().setMark('textStyle', merged).run();
                },
            unsetFontSize:
                () =>
                ({ chain }) => {
                    return chain().unsetMark('textStyle').run();
                },
        };
    },
});
