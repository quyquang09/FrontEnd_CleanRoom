import className from 'classnames/bind';
// import AddDevice from '../AddDevice';
import Button from '~/components/Button';
import { PlusIcon } from '~/components/Icons';

import styles from './DeviceManager.module.scss';

const cx = className.bind(styles);

function DeviceManager() {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header-page')}>Device Manager</h2>
            <div className={cx('btn-add-device')}>
                <Button leftIcon={<PlusIcon />} to="./add-device" primary>
                    AddDevice
                </Button>
            </div>
            <div className={cx('list-device')}>
                <h4>List Device</h4>
            </div>
        </div>
    );
}

export default DeviceManager;
