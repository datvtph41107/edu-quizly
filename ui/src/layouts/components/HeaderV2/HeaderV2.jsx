import Button from '~/components/Button';
import style from './HeaderV2.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import ProfileHeaderSetting from '../Profile';

const cx = classNames.bind(style);

function HeaderV2() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('contain')}>
                    <div className={cx('contain-main')}>
                        <Button rounded outline>
                            <FontAwesomeIcon icon={faBell} />
                        </Button>
                        <Button medium outline>
                            Enter code
                        </Button>
                        <Button leftIcon={<FontAwesomeIcon icon={faCommentDots} />} medium outline>
                            Get help
                        </Button>
                        <div className={cx('profile')}>
                            <ProfileHeaderSetting />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderV2;
