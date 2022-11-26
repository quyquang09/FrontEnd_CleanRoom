import classNames from 'classnames/bind';
import { child, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';
import axios from 'axios';

import PieChart from '~/components/PieChart';
import Table from '~/components/Table';
import styles from './DeviceMonitor.module.scss';
import { database } from '~/fribase';
import Selects from '~/components/Selects';

const cx = classNames.bind(styles);
const dbRef = ref(database);
function DeviceMonitor() {
    document.title = 'LUXAS-Device Monitor';
    const [location, setLocation] = useState('null');
    const [statusDevicce, setStatusDevicce] = useState('');
    const [timeMode, setTimeMode] = useState('yesterday');
    const [timePeriod, SetTimePeriod] = useState({
        from: '',
        to: '',
    });
    const handleSelectLocation = (value) => {
        setLocation(value);
    };

    const [dataTable, setDataTable] = useState([]);
    const [totalTime, setTotalTime] = useState({ on: '', off: '', error: '' });
    const handleCallApi = (mode, type, valueTimeFrom, valueTimeTo) => {
        const url = process.env.REACT_APP_API_URL;
        axios
            .get(url + '/getStatusDevice', {
                params: {
                    mode: mode,
                    type: type,
                    from: valueTimeFrom,
                    to: valueTimeTo,
                    location: location,
                },
            })
            .then(function (response) {
                if (mode === 'getsum') {
                    setTotalTime({
                        on: addlTime(response.data.on),
                        off: addlTime(response.data.off),
                        error: addlTime(response.data.error),
                    });
                } else {
                    setDataTable(response.data.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const addlTime = (value = []) => {
        if (value.length > 0) {
            let total;
            let time = [];
            let hour = 0;
            let min = 0;
            let sec = 0;
            for (let i = 0; i < value.length; i++) {
                let times = value[i].status_time.split(':');
                hour += parseInt(times[0]);
                min += parseInt(times[1]);
                sec += parseInt(times[2]);
            }
            if (min >= 60) {
                hour += Math.floor(min / 60);
                min -= 60;
            }
            if (sec >= 60) {
                min += Math.floor(sec / 60);
                sec -= 60;
            }
            time = [hour, min, sec];
            total = time.join(':');
            return total;
        }
    };

    useEffect(() => {
        var today = new Date();
        var yesterday = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() - 1);
        var currentday = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var thismonth = today.getMonth() + 1;
        var lastmonth = today.getMonth();
        switch (timeMode) {
            case 'yesterday':
                handleCallApi('getsum', 'yesterday', yesterday);
                handleCallApi('getAll', 'yesterday', yesterday);
                break;
            case 'currentday':
                handleCallApi('getsum', 'currentday', currentday);
                handleCallApi('getAll', 'currentday', currentday);
                break;
            case 'thismonth':
                handleCallApi('getsum', 'thismonth', thismonth);
                handleCallApi('getAll', 'thismonth', thismonth);
                break;
            case 'lastmonth':
                handleCallApi('getsum', 'lastmonth', lastmonth);
                handleCallApi('getAll', 'lastmonth', lastmonth);
                break;
            case 'Period':
                break;
            default:
                break;
        }
    }, [timeMode]);
    useEffect(() => {
        onValue(child(dbRef, `statusDevice/${location}`), (snapshot) => {
            const dataFb = snapshot.val();

            setStatusDevicce(dataFb);
        });
    }, [location]);
    const handlePeriod = () => {
        handleCallApi('getsum', 'Period', timePeriod.from, timePeriod.to);
        handleCallApi('getAll', 'Period', timePeriod.from, timePeriod.to);
    };
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header-page')}>Device Monitor</h2>
            <div className={cx('select-location')}>
                <Selects type="location" change={handleSelectLocation} />
            </div>
            <div className={cx('status-device')}>
                <h4 className={cx('head-content')}>Current device status</h4>
                <div className={cx('status-content')}>
                    <div className={cx('status-light')}>
                        <div className={cx({ on: statusDevicce === 'on' ? true : false })}></div>
                        <div className={cx({ error: statusDevicce === 'error' ? true : false })}></div>
                        <div className={cx({ off: statusDevicce === 'off' ? true : false })}></div>
                    </div>
                    <div className={cx('staust-name')}>
                        Status : <p>{statusDevicce}</p>
                    </div>
                </div>
            </div>
            <div className={cx('statistical')}>
                <h2 className={cx('head-content')}>My Stats</h2>
                <div className={cx('select-time')}>
                    <button
                        className={cx('item', { active: timeMode === 'yesterday' ? true : false })}
                        onClick={() => setTimeMode('yesterday')}
                    >
                        Yesterday
                    </button>
                    <button
                        className={cx('item', { active: timeMode === 'currentday' ? true : false })}
                        onClick={() => setTimeMode('currentday')}
                    >
                        CurrentDay
                    </button>

                    <button
                        className={cx('item', { active: timeMode === 'thismonth' ? true : false })}
                        onClick={() => setTimeMode('thismonth')}
                    >
                        This Month
                    </button>
                    <button
                        className={cx('item', { active: timeMode === 'lastmonth' ? true : false })}
                        onClick={() => setTimeMode('lastmonth')}
                    >
                        Last Month
                    </button>
                    <span
                        className={cx('item', { active: timeMode === 'Period' ? true : false })}
                        onClick={() => setTimeMode('Period')}
                    >
                        {/* <CalendarIcon className={cx('icon')} />
                        Khoảng thời gian */}
                        <>
                            <input
                                onChange={(e) => SetTimePeriod((prev) => ({ ...prev, from: e.target.value }))}
                                className={cx('input-time')}
                                type="date"
                            />
                            <label style={{ margin: '0 6px', fontSize: '1.4rem' }}>To</label>
                            <input
                                type="date"
                                placeholder="dd-mm-yyyy"
                                onChange={(e) => SetTimePeriod((prev) => ({ ...prev, to: e.target.value }))}
                                className={cx('input-time')}
                            />
                            <button onClick={handlePeriod} className={cx('btn-select')}>
                                OK
                            </button>
                        </>
                    </span>
                </div>
                <PieChart data={totalTime} type={timeMode} valuePeriod={timePeriod} />
                <div className={cx('list-status')}>
                    <h2 className={cx('head-content')}>Status List</h2>
                    <Table data={dataTable} type="value-status" />
                </div>
            </div>
        </div>
    );
}

export default DeviceMonitor;
