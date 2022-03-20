import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

import Dashboard from "../views/Dashboard.vue";
import Forms from "../views/Forms.vue";

import UIElements from "../views/UIElements.vue";
import Login from "../views/Login.vue";
import Modal from "../views/Modal.vue";
import Card from "../views/Card.vue";
import Blank from "../views/Blank.vue";
import NotFound from "../views/404.vue";
import Tables from "../views/Tables.vue";
import {useAuthState} from "../composables/authState";

const routes: RouteRecordRaw[] = [
    {
        path: "/user/login",
        name: "login",
        component: Login,
        meta: {layout: "empty", requiresAuth: false},
    },
    {
        path: "/",
        name: "dashboardHome",
        component: Dashboard,
        meta: { requiresAuth: true },
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
    },
    {
        path: "/forms",
        name: "forms",
        component: Forms,
        meta: { requiresAuth: true },
    },
    {
        path: "/cards",
        name: "cards",
        component: Card,
        meta: { requiresAuth: true },
    },
    {
        path: "/tables",
        name: "tables",
        component: Tables,
        meta: { requiresAuth: true },
    },
    {
        path: "/ui-elements",
        name: "uielements",
        component: UIElements,
        meta: { requiresAuth: true },
    },
    {
        path: "/modal",
        name: "modal",
        component: Modal,
        meta: { requiresAuth: true },
    },
    {
        path: "/blank",
        name: "blank",
        component: Blank,
        meta: { requiresAuth: true },
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound,
        meta: {layout: "empty", requiresAuth: false},
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

router.beforeEach((to, from, next) => {

    const { authenticating } = useAuthState()


    if ( authenticating.value === false && to.meta.requiresAuth === true) {
        next({ name: 'login' })
    }else {

        if ( authenticating.value === true && (to.name == 'login' || to.name == 'register')){
            next({ name: 'dashboard' })
        }
        next()
    }
})

export default router;
