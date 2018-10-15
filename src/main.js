import Vue from "vue";

import VueSweetalert2 from "vue-sweetalert2";
import VModal from "vue-js-modal";
import PrettyCheckbox from "pretty-checkbox-vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(PrettyCheckbox);
Vue.use(VModal);
Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
