import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';

import styles from './AddDevice.module.scss';

const cx = classNames.bind(styles);
const url = process.env.REACT_APP_API_URL;
// const aquaticCreatures = [
//     { label: 'Light', value: 'Light' },
//     { label: 'Fan', value: 'Fan' },
//     { label: 'Ari Conditioning', value: 'Ari' },
// ];
function AddDevice() {
    const [modelocation, setModeLocation] = useState();
    const [error, setError] = useState(0);
    const [message, setMessage] = useState();
    const [deviceName, setDeviceName] = useState('');
    const [location, setLocation] = useState('null');
    const [typeDevice, setTypeDevice] = useState('null');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(deviceName, location, typeDevice);
        axios
            .post(url + '/setDevices/', {
                namedevice: deviceName,
                location: location,
                type: typeDevice,
            })
            .then((res) => {
                setError(res.data.status);
                setMessage(res.data.msg);
                alert(res.data.msg);
            });

        setDeviceName('');
        setLocation('null');
        setTypeDevice('null');
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}> Add New Devices</h2>
            <form method="post" className={cx('form')}>
                <div className={cx('form-group')}>
                    <label forhtml="deviceName" className={cx('form-label')}>
                        Tên Thiết bị
                    </label>
                    <input
                        value={deviceName}
                        name="location-device"
                        placeholder="Ex: Work Shop 1"
                        type="text"
                        className={cx('form-input', 'input')}
                        onChange={(e) => setDeviceName(e.target.value)}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label forhtml="device-type" className={cx('form-label')}>
                        Loại thiết bị
                    </label>
                    <div className={cx('select-wrapper')}>
                        <select
                            value={typeDevice}
                            className={cx('select-location')}
                            onChange={(e) => setTypeDevice(e.target.value)}
                        >
                            <option value="null"> Select...</option>
                            <option value="fan"> Fan</option>
                            <option value="ari"> Ari Conditioner</option>
                            <option value="light"> Light</option>
                        </select>
                    </div>
                </div>
                <div className={cx('form-group')}>
                    <label forhtml="phonenumber" className={cx('form-label')}>
                        Vị trí
                    </label>
                    <div className={cx('inputGroup')}>
                        <input
                            className={cx('input')}
                            name="location"
                            type="radio"
                            id="radio1"
                            value="available"
                            onChange={(e) => setModeLocation(e.target.value)}
                        />
                        <label htmlFor="radio1">Vị trí có sẵn</label>
                    </div>
                    {modelocation === 'available' && (
                        <div className={cx('select-wrapper')}>
                            <select
                                value={location}
                                className={cx('select-location')}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                <option value="null"> Select...</option>
                                <option value="workshop1"> Work Shop 1</option>
                                <option value="workshop2"> Work Shop 2</option>
                            </select>
                        </div>
                    )}
                    <div className={cx('inputGroup')}>
                        <input
                            className={cx('input')}
                            name="location"
                            type="radio"
                            id="radio2"
                            value="new"
                            onChange={(e) => setModeLocation(e.target.value)}
                        />
                        <label htmlFor="radio2">Vị trí mới</label>
                    </div>
                    {modelocation === 'new' && (
                        <span className={cx('location-input')}>
                            <input
                                name="location-device"
                                placeholder="Ex: Work Shop 1"
                                type="text"
                                className={cx('form-input', 'input')}
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </span>
                    )}
                </div>
                <button
                    name="submit"
                    value="Add device"
                    type="submit"
                    className={cx('form-submit')}
                    onClick={handleSubmit}
                >
                    Thêm
                </button>
            </form>
        </div>
    );
}

export default AddDevice;
