import styles from './MakeSlideLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function MakeSlideLayout({ children }) {
    return (
        <div>
            <h1>Make Slide Layout</h1>
            {children}
        </div>
    );
}

export default MakeSlideLayout;
