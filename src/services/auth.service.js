import axios from 'axios';
const API_URL = 'http://127.0.0.1/api/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'login', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.access_token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
    register(user) {
        return axios.post(API_URL + 'register', {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            user_details: {
                address: user.address,
                country: user.country
            }
        });
    }
}
export default new AuthService();