import { ArrowIcon, EllipseIcon, LineIcon, StarIcon, TriangleIcon } from '~/components/Icons';
import ContentText from '../Dragable/ContentText';

export const ElementTypes = {
    arrow: ArrowIcon,
    circle: EllipseIcon,
    star: StarIcon,
    triangle: TriangleIcon,
    line: LineIcon,
};

export const render = ({ type, propStyles, props, tab }) => {
    let Component = 'div';

    if (type !== 'block') {
        Component = ElementTypes[type];
    }

    if (Component && tab === 'shape') {
        return (
            <>
                <Component {...propStyles} />
                {type !== 'line' && type !== 'arrow' && <ContentText {...props} />}
            </>
        );
    } else {
        return <ContentText {...props} />;
    }
};
