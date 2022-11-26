import classNames from 'classnames/bind';
import axios from 'axios';
import { HiPencilAlt } from 'react-icons/hi';
import { MdDeleteForever } from 'react-icons/md';

import styles from './AccList.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
const url = process.env.REACT_APP_API_URL;

function AccList() {
    const [arrAcc, setArrAcc] = useState([]);
    const [subBtn, setSubBtn] = useState(false);
    const [display, setDisplay] = useState('none');

    useEffect(() => {
        axios
            .post(url + '/get-accounts/', {
                mode: 'all',
            })
            .then(function (response) {
                setArrAcc(response.data.user);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    const handleClickEdit = (index) => {};

    return (
        <div className={cx('wrapper')}>
            <h3>Account List</h3>
            <div className={cx('acc-table')}>
                <table className={cx('table')} id="customers">
                    <thead>
                        <tr className={cx('tr')}>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Rights</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrAcc.map((item, index) => (
                            <tr className={cx('tr')} key={index}>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.rights}</td>
                                <td>
                                    <button className={cx('btn-action')}>
                                        <HiPencilAlt
                                            className={cx('icon-btn-1')}
                                            onClick={() => handleClickEdit(index)}
                                        />
                                        <MdDeleteForever className={cx('icon-btn-2')} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AccList;
