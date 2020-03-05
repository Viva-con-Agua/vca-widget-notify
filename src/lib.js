import VcANotificationCenter from './components/VcANotificationCenter.vue'
import VcaNotificationBox from './components/VcANotificationBox.vue'
import VcANotificationWaves from './components/VcANotificationWaves.vue'
import VcANotificationSuggesty from './components/VcANotificationSuggesty.vue'

import VueI18n from 'vue-i18n'
import en from './lang/en.json'
import de from './lang/de.json'

function getLang (Vue, options) {
  function exists (options) {
    return (typeof options !== 'undefined') && options.hasOwnProperty('i18n') && (typeof options.i18n !== 'undefined') && options.i18n !== null
  }

  if (!exists(options)) {
    Vue.use(VueI18n)

    const i18n = new VueI18n({
      locale: 'de-DE',
      fallbackLocale: 'en-US',
      messages: { 'en-US': en, 'de-DE': de }
    })

    Vue.prototype.$vcaI18n = i18n
  } else {
    options.i18n.mergeLocaleMessage('de-DE', de)
    options.i18n.mergeLocaleMessage('en-US', en)
    Vue.prototype.$vcaI18n = options.i18n
  }
  return Vue
}

VcANotificationCenter.install = function (Vue, options) {
  Vue = getLang(Vue, options)
  Vue.component('vca-notification-center', VcANotificationCenter)
}

VcaNotificationBox.install = function (Vue, options) {
  Vue = getLang(Vue, options)
  Vue.component('vca-notification-box', VcaNotificationBox)
}

VcANotificationWaves.install = function (Vue, options) {
  Vue = getLang(Vue, options)
  Vue.component('vca-notification-waves', VcANotificationWaves)
}

VcANotificationSuggesty.install = function (Vue, options) {
  Vue = getLang(Vue, options)
  Vue.component('vca-notification-suggesty', VcANotificationSuggesty)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VcANotificationCenter)
  window.Vue.use(VcaNotificationBox)
  window.Vue.use(VcANotificationWaves)
}

export default VcANotificationCenter
const version = '__VERSION__'
// Export all components too
export {
  VcANotificationCenter,
  VcaNotificationBox,
  VcANotificationWaves,
  VcANotificationSuggesty,
  version
}
