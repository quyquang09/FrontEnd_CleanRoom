import { useEffect, useState } from 'react';
import styles from './Selects.module.scss';
import axios from 'axios';

function SelectLocation({ change = () => {}, isEnable = false, type = 'location' }) {
    const handleChangeSelect = (value) => {
        change(value);
    };

    const [location, setLocation] = useState([]);
    useEffect(() => {
        if (type === 'location') {
            const url = process.env.REACT_APP_API_URL;
            axios
                .get(url +'/getDevices/', {
                    params: {
                        action: 'getLocation',
                    },
                })
                .then(function (response) {
                    setLocation(response.data.location);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [type]);
    return (
        <div className={styles['wrapper']}>
            <select
                className={styles['select']}
                disabled={isEnable}
                onChange={(e) => handleChangeSelect(e.target.value)}
            >
                <option value={'null'}>{`Select ${type}.....`}</option>
                {location.map((item, index) => (
                    <option key={index} value={item.key_location}>
                        {item.name_location}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectLocation;
