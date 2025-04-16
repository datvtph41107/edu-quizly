import { faAlignLeft, faPencil, faSquareCheck, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';

export class Utils {
    static colorOptions = [
        'rgb(126, 27, 27)',
        'rgb(149, 77, 4)',
        'rgb(138, 106, 40)',
        'rgb(56, 107, 46)',
        'rgb(18, 84, 57)',
        'rgb(13, 77, 89)',
        'rgb(19, 64, 108)',
        'rgb(88, 38, 80)',
        'rgb(134, 45, 67)',
        'rgb(7, 10, 14)',
        'rgb(173, 31, 54)',
        'rgb(204, 119, 0)',
        'rgb(204, 166, 51)',
        'rgb(82, 143, 61)',
        'rgb(22, 105, 64)',
        'rgb(15, 128, 138)',
        'rgb(26, 100, 152)',
        'rgb(126, 54, 114)',
        'rgb(191, 64, 85)',
        'rgb(229, 229, 230)',
        'rgb(217, 38, 53)',
        'rgb(239, 169, 41)',
        'rgb(255, 221, 51)',
        'rgb(111, 178, 77)',
        'rgb(31, 147, 80)',
        'rgb(45, 157, 166)',
        'rgb(45, 112, 174)',
        'rgb(154, 66, 146)',
        'rgb(213, 84, 109)',
        'rgb(255, 255, 255)',
        'rgb(224, 82, 94)',
        'rgb(255, 221, 153)',
        'rgb(255, 230, 102)',
        'rgb(140, 194, 112)',
        'rgb(77, 179, 119)',
        'rgb(64, 170, 191)',
        'rgb(92, 153, 214)',
        'rgb(159, 96, 154)',
        'rgb(232, 125, 143)',
        'rgb(250, 250, 250)',
        'rgb(247, 212, 215)',
        'rgb(252, 237, 207)',
        'rgb(255, 246, 204)',
        'rgb(226, 240, 219)',
        'rgb(221, 238, 228)',
        'rgb(215, 241, 244)',
        'rgb(214, 230, 245)',
        'rgb(237, 222, 236)',
        'rgb(247, 212, 218)',
        'rgb(255, 255, 255)',
    ];

    static fontOptions = [
        'Quicksand',
        'Lobster',
        'BEBAS NEUE',
        'Playfair Display',
        'Patrick Hand',
        'Cookie',
        'Roboto',
        'Arial',
        'Georgia',
        'Times New Roman',
        'Verdana',
        'Courier New',
        'Tangerine',
        'Dancing Script',
    ];

    static BORDER_SIZES = ['No Border', '1', '2', '3', '4', '5', '6', '7', '8'];

    static slideTypes = [
        {
            span: 'Blank slide',
            type: 'blank',
            backgroundPosition: '-2px -2px',
        },
        {
            span: 'Title slide',
            type: 'title',
            backgroundPosition: '-2px 264px',
        },
        {
            span: 'Text slide',
            type: 'text',
            backgroundPosition: '-2px 210px',
        },
        {
            span: 'Text and media',
            type: 'textMedia',
            backgroundPosition: '-2px 155px',
        },
        {
            span: 'Fullscreen media',
            type: 'fullscreenMedia',
            backgroundPosition: '-2px 101px',
        },
        {
            span: 'Web page link',
            type: 'WebPageLink',
            backgroundPosition: '-2px 46px',
        },
    ];

    static buttonData = [
        {
            icon: faSquareCheck,
            text: 'Multiple Choice',
            iconStyle: { fontSize: '18px', color: 'white' },
            bgClass: 'section-manualy-bg',
            overlayClass: 'section-overlay',
        },
        {
            icon: null,
            text: 'Fill the Blank',
            iconStyle: null,
            bgClass: 'section-manualy-bg',
            overlayClass: 'section-overlay',
            blank: true,
        },
        {
            icon: faAlignLeft,
            text: 'Open Ended',
            iconStyle: { fontSize: '18px', color: 'white' },
            bgClass: 'section-manualy-bg',
            overlayClass: 'section-overlay',
        },
        {
            icon: faSquarePollVertical,
            text: 'Poll',
            iconStyle: { fontSize: '18px', color: 'white' },
            bgClass: 'section-manualy-bg',
            overlayClass: 'section-overlay',
        },
        {
            icon: faPencil,
            text: 'Draw',
            iconStyle: { fontSize: '18px', color: 'white' },
            bgClass: 'section-manualy-bg',
            overlayClass: 'section-overlay',
        },
    ];

    static fontSizeOptions = ['12', '14', '16', '18', '20', '24', '32', '48', '64'];

    // static getSpanTextAttributeParser = (editor) => {
    //     const html = editor.getHTML();

    //     const parser = new DOMParser();
    //     const doc = parser.parseFromString(html, 'text/html');
    //     const span = doc.querySelector('span');
    //     console.log(span?.outerHTML);

    //     return span?.outerHTML;
    // };
}
