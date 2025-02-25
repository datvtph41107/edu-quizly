export const EllipseIcon = ({ id = '', width = '100%', height = '100%', className }) => (
    <svg
        id={id}
        className={className}
        width={width}
        height={height}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        fill="#429a50"
        stroke="#429a50"
        strokeWidth="2"
    >
        <ellipse id={id} cx="50" cy="50" rx="49" ry="49"></ellipse>
    </svg>
);

export const TriangleIcon = ({ id = '', width = '100%', height = '100%', className }) => (
    <svg
        id={id}
        style={{ zIndex: 10 }}
        className={className}
        width={width}
        height={height}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        fill="#429a50"
        stroke="#429a50"
        strokeWidth="2"
    >
        <polygon id={id} points="50,4 98,99 2,99"></polygon>
    </svg>
);

export const StarIcon = ({ id = '', width = '100%', height = '100%', className }) => (
    <svg
        id={id}
        className={className}
        width={width}
        height={height}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        fill="#429a50"
        stroke="#429a50"
        strokeWidth="2"
    >
        <polygon id={id} points="50,4 61,35 95,35 67,58 81,96 50,68 19,96 33,58 5,35 39,35"></polygon>
    </svg>
);

export const LineIcon = ({ id = '', width = '100%', height = '100%', className }) => (
    <svg
        id={id}
        className={className}
        width={width}
        height={height}
        viewBox="0 0 100 4"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        fill="none"
        stroke="#429a50"
        strokeWidth="6"
    >
        <line id={id} strokeWidth="4" x1="0" y1="2" x2="100" y2="2"></line>
    </svg>
);

export const ArrowIcon = ({ id = '', width = '100%', height = '100%', className }) => (
    <svg
        id={id}
        className={className}
        width={width}
        height={height}
        viewBox="0 0 180 50"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        fill="none"
        stroke="#429a50"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{ vectorEffect: 'non-scaling-stroke' }}
    >
        <path
            id={id}
            d="M 0 25 H 180 M 180 25 L 151.7157287525381 -3.2842712474618985 M 180 25 L 151.7157287525381 53.2842712474619"
            fill="none"
            stroke="#429a50"
            strokeWidth="5"
            strokeLinejoin="round"
            strokeLinecap="round"
        />
    </svg>
);
