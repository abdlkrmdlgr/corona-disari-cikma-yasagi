import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

import {
    faUserPlus,
    faInfoCircle,
    faSave,
    faBan,
    faShoppingBag,
    faCar,
    faRunning, faHome, faRoad

} from "@fortawesome/free-solid-svg-icons";

library.add(
    faUserPlus,
    faInfoCircle,
    faSave,
    faBan,
    faShoppingBag,
    faCar,
    faRunning,
    faHome,
    faRoad
);

Vue.component("FontAwesomeIcon",FontAwesomeIcon);
Vue.use(BootstrapVue);

Vue.config.productionTip = true;

// Configuration VueAnalytics
// Vue.use(VueAnalytics, {
//   id: 'UA-12370199-6'
// });

new Vue({
    // router,
    render: h => h(App)
}).$mount('#app');
