import Vue from 'vue';

let hideModals;
Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    hideModals = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', hideModals)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', hideModals)
  }
});