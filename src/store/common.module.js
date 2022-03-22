import CountryService from '../services/country.service';

export const common = {
    namespaced: true,
    state: {countries:[]},
    actions: {
        getAllCountries({ commit }) {
            return CountryService.all().then(
                countries => {
                    if (countries.data) {
                        commit('setCountries', countries.data);
                        return Promise.resolve(countries.data);
                    }

                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
    },
    mutations: {
        setCountries(state, countries) {
            state.countries = countries;
        },
    }
};