import Vue from "vue";
import App from "./App.vue";

import VueAxios from "vue-axios";

import router from "./router/index";
import Axios from "axios";

Vue.config.productionTip = false;
Vue.config.errorHandler = function(err: Error, vm, info) {
  // prettier-ignore
  if (err.message.startsWith("Avoided redundant navigation to current location")) {
    return;
  }

  throw err;
};

export const axiosInstance = Axios.create({
  baseURL: "http://localhost:3000"
});

Vue.use(VueAxios, axiosInstance);

const app = new Vue({
  router,
  render: h => h(App)
});

app.$mount("#app");
