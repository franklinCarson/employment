import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {

                black: '#000000',
                darkGrey: '#111111',
                lightGrey: '#828282',
                neutral: '#f2f2f2',
                highlight: '#50B4CE',
                accent: '#bf4800',
                link: '#06c'
            }
        }
    }
});
