import { useState, forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Image.module.scss';
import avatar1 from '~/assets/image/profile/icon-avatar-1.png';
import avatar2 from '~/assets/image/profile/icon-avatar-2.png';
import avatar3 from '~/assets/image/profile/icon-avatar-3.png';
import avatar4 from '~/assets/image/profile/icon-avatar-5.png';

const avatars = [avatar1, avatar2, avatar3, avatar4];

const Image = forwardRef(({ src, alt, className, fallback: customFallback = '', ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback || avatars[Math.floor(Math.random() * avatars.length)]);
    };

    const effectiveSrc = src || avatars[Math.floor(Math.random() * avatars.length)];

    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={fallback || effectiveSrc}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

export default Image;
