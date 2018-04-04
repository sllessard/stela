import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import scenes from '../stela/stela_build.js';

export const store = new Vuex.Store({
  state: {
    currentScene: '',
    onStela: true,
    scenes: scenes
  }
});