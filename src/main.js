import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import '../theme/index.css'
import CMS from './CMS.vue'
import router from './router'
import store from './store'
import './assets/css/highlight.css'
import highlight from 'highlight.js'
import 'whatwg-fetch'

Vue.directive('highlight', (el) => {
  let codes = el.querySelectorAll('code');
  let pres = el.querySelectorAll('pre');
  codes.forEach((codes) => {
    highlight.highlightBlock(codes)
  })
  pres.forEach((pres) => {
    highlight.highlightBlock(pres)
  })
})

Vue.config.productionTip = false

Vue.use(ElementUI, {locale})

new Vue({
  el: '.CMS_ROOT',
  router,
  store,
  template: '<CMS/>',
  components: {CMS}
})
