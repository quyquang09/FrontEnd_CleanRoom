import classNames from 'classnames/bind';
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { FiSettings, FiHelpCircle } from 'react-icons/fi';
import { BiMessageEdit } from 'react-icons/bi';
import { TbMessageLanguage } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import config from '~/config';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import Search from '../Search';
import { DarkModeIcon, NotificationIcon, ThreeDotsIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <TbMessageLanguage />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'Ngôn ngữ',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FiHelpCircle width="2.2rem" height="2.2rem" />,
        title: 'Help and Feedback',
        to: '/feedback',
    },
    {
        icon: <BiMessageEdit />,
        title: 'Contribute ideas',
    },
];

function Header() {
    const user = JSON.parse(localStorage.getItem('user'));

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };

    const userMenu = [
        {
            icon: <AiOutlineUser />,
            title: 'View profile',
            to: '/@quang',
        },
        {
            icon: <FiSettings />,
            title: 'Settings',

            children: {
                title: 'Settings',
                data: [
                    {
                        type: 'Settings',
                        code: 'en',
                        title: 'Account Settings',
                        to: '/settingaccount',
                    },
                    {
                        type: 'Settings',
                        code: 'vi',
                        title: 'Connection settings',
                        to: '/settingconnect',
                    },
                ],
            },
        },
        ...MENU_ITEMS,
        {
            icon: <AiOutlineLogout />,
            title: 'Log out',
            to: '/login',
            separate: true,
            onclick: true,
        },
    ];
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img className={cx('img-logo')} src={images.logo} alt="Logo" />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    {user.isLoggedIn ? (
                        <>
                            <Tippy delay={[0, 20]} content="Dark mode" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <DarkModeIcon width="2.8rem" height="2.8rem" />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 20]} content="Notify" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <NotificationIcon width="2.8rem" height="2.8rem" />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button to="/register" text>
                                Sign up
                            </Button>
                            <Button to="/login" primary>
                                Sign in
                            </Button>
                        </>
                    )}

                    <Menu items={user.isLoggedIn ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {user.isLoggedIn ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-1/295675839_3325365674403489_3330426815535117865_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=1eb0c7&_nc_ohc=6Vf-PW3jK5MAX-AuCxu&_nc_ht=scontent.fsgn5-5.fna&oh=00_AT9ODS_-smzAWtZTLozCSMaTqsAUt9ol3RAzz7EzTTl5cg&oe=63002A6F"
                                alt="Nguyen Van A"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <ThreeDotsIcon width="2.8rem" height="2.8rem" />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
