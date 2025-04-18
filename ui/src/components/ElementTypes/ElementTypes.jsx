import { ArrowIcon, EllipseIcon, LineIcon, StarIcon, TriangleIcon, RectangleIcon } from '~/components/Icons';
import ContentText from '../Dragable/ContentText';
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Link from '@tiptap/extension-link';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Placeholder from '@tiptap/extension-placeholder';
import { TYPE_SHAPE, TYPE_TABLE_SHAPE } from '~/utils/Const';
import ContentTextView from '../Dragable/ContentTextView';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import TableTipTap from '@tiptap/extension-table';
import { BringForwardExtension, FontSize, SendBackExtension } from './Extension';

const ElementTypes = {
    arrow: ArrowIcon,
    circle: EllipseIcon,
    star: StarIcon,
    triangle: TriangleIcon,
    line: LineIcon,
    rectangle: RectangleIcon,
};

export const TypesEditor = {
    italic: { active: false },
    bold: { active: false },
    underline: { active: false },
    superscript: { active: false, only: false },
    subscript: { active: false, only: false },
    strike: { active: false },
    orderedList: { active: false },
    bulletList: { active: false },
    fontSize: { active: false, value: '' },
    fontFamily: { active: false, value: '' },
    color: { active: false, value: '' },
    backgroundColor: { active: false, value: '' },
    border: { active: false, value: '' },
    borderColor: { active: false, value: '' },
    textAlign: [
        { id: 1, active: false, alignment: 'left' },
        { id: 2, active: false, alignment: 'center' },
        { id: 3, active: false, alignment: 'right' },
        { id: 4, active: false, alignment: 'justify' },
    ],
};

const editorTypes = Object.keys(TypesEditor);

export const extensions = [
    StarterKit.configure({ table: false }),
    Underline,
    Subscript,
    Superscript,
    BringForwardExtension,
    SendBackExtension,
    FontSize,
    FontFamily,
    TextStyle,
    Color,
    TableTipTap.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
    Placeholder.configure({
        placeholder: 'Type...',
        showOnlyCurrent: true,
    }),
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    Link.configure({
        linkOnPaste: true,
        openOnClick: false, // ok
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        HTMLAttributes: {
            style: 'color: #5800cc; text-decoration: underline; cursor: pointer;',
        },
        isAllowedUri: (url, ctx) => {
            try {
                // construct URL
                const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`);
                // use default validation
                if (!ctx.defaultValidate(parsedUrl.href)) {
                    return false;
                }
                // disallowed protocols
                const disallowedProtocols = ['ftp', 'file', 'mailto'];
                const protocol = parsedUrl.protocol.replace(':', '');
                if (disallowedProtocols.includes(protocol)) {
                    return false;
                }
                // only allow protocols specified in ctx.protocols
                const allowedProtocols = ctx.protocols.map((p) => (typeof p === 'string' ? p : p.scheme));

                if (!allowedProtocols.includes(protocol)) {
                    return false;
                }
                // disallowed domains
                const disallowedDomains = ['example-phishing.com', 'malicious-site.net'];
                const domain = parsedUrl.hostname;

                if (disallowedDomains.includes(domain)) {
                    return false;
                }
                // all checks have passed
                return true;
            } catch {
                return false;
            }
        },
        shouldAutoLink: (url) => {
            try {
                // construct URL
                const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`);
                // only auto-link if the domain is not in the disallowed list
                const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com'];
                const domain = parsedUrl.hostname;
                return !disallowedDomains.includes(domain);
            } catch {
                return false;
            }
        },
    }),
];

export const render = ({ type, propStyles, props, tab }) => {
    let Component = 'div';

    if (type !== 'block') {
        Component = ElementTypes[type];
    }

    if (tab === TYPE_TABLE_SHAPE) {
        return <ContentText {...props} />;
    }

    if (tab === TYPE_SHAPE) {
        return (
            <>
                <div style={{ opacity: propStyles.style.opacity }}>
                    <Component {...propStyles} />
                </div>
                {type !== 'line' && type !== 'arrow' && <ContentText {...props} />}
            </>
        );
    } else {
        return <ContentText {...props} />;
    }
};

export const renderView = ({ type, propStyles, props, tab }) => {
    let Component = ElementTypes[type];

    if (tab === TYPE_TABLE_SHAPE) {
        return <ContentTextView {...props} />;
    }

    if (Component && tab === TYPE_SHAPE) {
        return (
            <>
                <Component {...propStyles} />
                {type !== 'line' && type !== 'arrow' && <ContentTextView {...props} />}
            </>
        );
    } else {
        return <ContentTextView {...props} />;
    }
};

export const handleChangeTypeEditor = ({ editor, type, setChangeEditorType }) => {
    if (editor.isActive('superscript') && type === 'subscript') {
        editor.chain().focus().unsetMark('superscript').run();
        editor.chain().focus().setMark('subscript').run();
    } else if (editor.isActive('subscript') && type === 'superscript') {
        editor.chain().focus().unsetMark('subscript').run();
        editor.chain().focus().setMark('superscript').run();
    } else if (editor.isActive(type)) {
        editor.chain().focus().unsetMark(type).run();
    } else {
        editor.chain().focus().setMark(type).run();
    }

    updateEditorState({ editor: editor, setChangeEditorType: setChangeEditorType });
};

export const updateEditorState = ({ editor, setChangeEditorType, value = '', name }) => {
    const updatedState = Object.keys(TypesEditor).reduce((acc, type) => {
        if (type === 'textAlign') {
            acc[type] = TypesEditor[type].map((item) => {
                if (item.alignment === value) {
                    return { ...item, active: item.alignment === value };
                } else {
                    return { ...item, active: editor.isActive(type) };
                }
            });
        } else if (type === name) {
            acc[type] = {
                ...TypesEditor[type],
                active: type === name,
                value: value,
            };
        } else {
            acc[type] = {
                ...TypesEditor[type],
                active: editor.isActive(type),
            };
        }
        return acc;
    }, {});

    setChangeEditorType((prev) => ({
        ...prev,
        ...updatedState,
    }));
};

export const isActiveTypeState = ({ editor, changeEditorType }) => {
    for (let index = 0; index < editorTypes.length; index++) {
        let type = editorTypes[index];

        if (changeEditorType[type]?.active && type !== 'orderedList' && type !== 'bulletList') {
            editor.commands.setMark(type);
        }
    }
};
