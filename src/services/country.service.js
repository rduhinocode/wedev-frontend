import axios from 'axios';
const API_URL = 'https://restcountries.com/v2/';

class CountryService {
    all() {
        return axios
            .get(API_URL + 'all', );
    }
}

export default new CountryService();