import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
};
const handleVerifyEmail = (id, token) => {
    return axios.get(`/api/user/${id}/verify/${token}`);
};
const handleRegisterApi = (data) => {
    return axios.post(`/api/create-new-user`, {
        email: data.email,
        fullname: data.username,
        password: data.password,
        phonenumber: data.phonenumber,
    });
};
export { handleLoginApi, handleVerifyEmail, handleRegisterApi };
