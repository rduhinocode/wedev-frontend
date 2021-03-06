import {createWebHistory, createRouter} from "vue-router";

import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Dashboard from '../pages/Dashboard.vue';

// import Books from '../components/Books';
// import AddBook from '../components/AddBook';
// import EditBook from '../components/EditBook';

export const routes = [
    {
        name: 'home',
        path: '/',
        component: Login
    },
    {
        name: 'register',
        path: '/register',
        component: Register
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'dashboard',
        path: '/dashboard',
        component: Dashboard
    },
    // {
    //     name: 'books',
    //     path: '/books',
    //     component: Books
    // },
    // {
    //     name: 'addbook',
    //     path: '/books/add',
    //     component: AddBook
    // },
    // {
    //     name: 'editbook',
    //     path: '/books/edit/:id',
    //     component: EditBook
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
