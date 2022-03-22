import { createApp } from 'vue'
import App from './App.vue';
import router from './router';
import store from "./store";
import axios from 'axios';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome';


const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(router);
app.use(store);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount('#app');