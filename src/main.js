import Vue from 'vue'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import App from './App.vue'

import enElement from 'element-ui/lib/locale/lang/en'
import deElement from 'element-ui/lib/locale/lang/de'
import en from '@/lang/en.json'
import de from '@/lang/de.json'

import 'materialize-css'

require('./assets/materialize.min.css')




Vue.use(VueI18n)

Vue.config.productionTip = false

const locale = navigator.language
const i18n = new VueI18n({
  locale: locale,
  messages: {

    'en-US': Object.assign(en, enElement),
    'de-DE': Object.assign(de, deElement),
    'de': Object.assign(de, deElement),
    'en': Object.assign(en, enElement)

    /*
    'en-US': {}, // Object.assign(en, enElement),
    'de-DE': {}, // Object.assign(de, deElement),
    'de': {}, // Object.assign(de, deElement),
    'en': {} // Object.assign(en, enElement)
    */
  }
})

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
