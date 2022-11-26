import classNames from 'classnames/bind';
// import AddDevice from '~/pages/DeviceManager';

// import Button from '~/components/Button';
import styles from './Settings.module.scss';
import AccList from '~/components/AccList';

const cx = classNames.bind(styles);

function Register() {
    document.title = 'LUXAS-Settings';
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header-page')}>Settings </h2>
            {/* <Button className={cx('add-device')} to="./add-device" primary leftIcon={<AiOutlinePlusCircle />}>
                New Devices
            </Button> */}
            <div className={cx('acc-list')}>
                <AccList />
            </div>
        </div>
    );
}

export default Register;
