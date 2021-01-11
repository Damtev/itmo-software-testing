import VueRouter, { RouteConfig } from "vue-router";
import RandomMotivationNotePage from "../view/views/RandomMotivationNotePage.vue";
import MotivationNotePage from "../view/views/MotivationNotePage.vue";
import FindMotivationNotePage from "../view/views/FindMotivationNotePage.vue";
import FindMotivationNotePageById from "../view/views/FindMotivationNotePageById.vue";
import MotivationNoteDetailPage from "../view/views/MotivationNoteDetailPage.vue";
import Vue from "vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: MotivationNotePage
  },
  {
    path: "/random",
    component: RandomMotivationNotePage
  },
  {
    path: "/find",
    component: FindMotivationNotePage
  },
  {
    path: "/id",
    component: FindMotivationNotePageById
  },
  {
    path: "/note/:id",
    component: MotivationNoteDetailPage
  }
];

const router = new VueRouter({
  routes: routes
});

export default router;
