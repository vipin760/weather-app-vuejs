import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import { guardMyroute, authGuard } from "/src/store/routeGuard";

const routes = [
  { path: "/", name: "Home", beforeEnter: guardMyroute, component: Home },
  {
    path: "/login",
    name: "Login",
    beforeEnter: authGuard,
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
