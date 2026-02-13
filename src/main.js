import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSun } from '@fortawesome/free-regular-svg-icons'
import { faCirclePlus, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSun, faCirclePlus, faCircleInfo);

const app = createApp(App);

app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount("#app");
