/**
 * 该文件主要用来处理vue运行中所需js以及组件注册，全局样式等
 */
import Vue                      from 'vue';
import * as filters             from 'filters';
// import { compbox, lookpic }     from 'components';
import * as enums               from 'enums';
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS

import Axios                    from 'utils/ajax';
// import Core from './core';

// 注册vue filters;
Object.keys(filters).forEach(name => {
    Vue.filter(name, filters[name]);
});

// 注册全局函数
Vue.use(Axios);
Vue.use(iView);

// 原型挂在常用变量
Vue.prototype.$enums = enums;
