import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://127.0.0.1/api/';

class UserService {
    getUser(user) {
        return axios.get(API_URL + 'users/' + user, { headers: authHeader() });
    }
    getAllUsers(filter) {
        let queryString = Object.keys(filter).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(filter[key])
        }).join('&');

        return axios.get(API_URL + 'users?' + queryString, { headers: authHeader() });
    }
    addUser(user) {
        return axios.post(API_URL + 'users', {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.email,
            user_details: {
                address: user.address,
                country: user.country
            }
        }, { headers: authHeader() });
    }
        updateUser(userId, user) {
        return axios.post(API_URL + 'users/' + userId, {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.email,
            user_details: {
                address: user.address,
                country: user.country
            }
        }, { headers: authHeader() });
    }
    deleteUser(userId) {
        return axios.delete(API_URL + 'users/' + userId,{ headers: authHeader() });
    }
}
export default new UserService();