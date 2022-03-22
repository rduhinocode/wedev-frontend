import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/pages/Login.vue";
import Register from "./components/pages/Register.vue";
// lazy-loaded
const Dashboard = () => import("./components/pages/Dashboard.vue")

const routes = [
    {
        path: "/",
        name: "home",
        component: Login,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/register",
        component: Register,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;