import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import NotFound from "../components/partials/NotFound.vue";
import { guardMyroute, authGuard } from "../store/routeGuard";
import CityView from "../components/CityView.vue";

const routes = [
  { path: "/", name: "Home", beforeEnter: guardMyroute, component: Home },
  {
    path: "/weather/:state/:city",
    name: "cityView",
    beforeEnter: guardMyroute,
    component: CityView,
  },
  {
    path: "/login",
    name: "Login",
    beforeEnter: authGuard,
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    beforeEnter: authGuard,
    component: () => import("../components/Register.vue"),
  },
  {
    path: "/not-found",
    name: "NotFound",
    component: NotFound,
  },
  { path: "/:pathMatch(.*)*", redirect: "/not-found" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
