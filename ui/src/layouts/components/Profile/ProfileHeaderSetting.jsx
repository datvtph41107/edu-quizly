import Image from '~/components/Image';
import style from './ProfileHeaderSetting.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function ProfileHeaderSetting() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-prf')}>
                <Image className={cx('avatar')} />
            </div>
            <div className={cx('right-prf')}>
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
        </div>
    );
}

export default ProfileHeaderSetting;
