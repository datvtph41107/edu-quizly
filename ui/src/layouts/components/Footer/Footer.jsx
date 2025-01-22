import React from 'react';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('footer-container')}>
                <div className={cx('footer-column')}>
                    <h4>Features</h4>
                    <ul>
                        <li>School & District</li>
                        <li>Quizizz for Work</li>
                        <li>Create a quiz</li>
                        <li>Create a lesson</li>
                    </ul>
                </div>
                <div className={cx('footer-column')}>
                    <h4>Subjects</h4>
                    <ul>
                        <li>Mathematics</li>
                        <li>Social Studies</li>
                        <li>Science</li>
                        <li>Physics</li>
                        <li>Chemistry</li>
                        <li>Biology</li>
                    </ul>
                </div>
                <div className={cx('footer-column')}>
                    <h4>About</h4>
                    <ul>
                        <li>Our Story</li>
                        <li>Quizizz Blog</li>
                        <li>Media Kit</li>
                        <li>Careers</li>
                    </ul>
                </div>
                <div className={cx('footer-column')}>
                    <h4>Support</h4>
                    <ul>
                        <li>F.A.Q.</li>
                        <li>Help & Support</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                        <li>Teacher Resources</li>
                    </ul>
                </div>
            </div>

            <div className={cx('footer-bottom')}>
                <div className={cx('footer-left')}>
                    <p>&copy; 2025 Quizizz Inc.</p>
                    <ul className={cx('social-links')}>
                        <li>
                            <i className="fab fa-twitter"></i>
                        </li>
                        <li>
                            <i className="fab fa-facebook-f"></i>
                        </li>
                        <li>
                            <i className="fab fa-instagram"></i>
                        </li>
                    </ul>
                    <p>Sitemap</p>
                </div>
                <div className={cx('footer-right')}>
                    <p>Get our app</p>
                    <div className={cx('app-links')}>
                        {/* <img src="https://via.placeholder.com/120x40?text=App+Store" alt="App Store" />
                        <img src="https://via.placeholder.com/120x40?text=Google+Play" alt="Google Play" /> */}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
