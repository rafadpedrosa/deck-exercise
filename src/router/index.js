import Vue from "vue";
import VueRouter from "vue-router";
import Deck from "../views/Deck.vue";
import NewDeck from "../views/NewDeck";

Vue.use(VueRouter);

const routes = [
  {
    path: "/deck/new",
    name: "NewDeck",
    component: NewDeck,
  },
  {
    path: "/deck/:id",
    name: "Deck",
    component: Deck,
  },
  {
    path: "*",
    name: "default",
    redirect: "/deck/new",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NewDeck.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
