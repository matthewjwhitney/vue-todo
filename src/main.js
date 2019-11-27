import Vue from "vue";
import App from "./App.vue";

// required for vue-masonry
import { VueMasonryPlugin } from "vue-masonry";

//required for fontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faEdit,
  faSave,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

//required for fontAwesome; add new icons you'd like to use to the library below
library.add(faCheck, faEdit, faSave, faTrash);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

// required for vue-masonry
Vue.use(VueMasonryPlugin);

//init view app
new Vue({
  render: h => h(App)
}).$mount("#app");
