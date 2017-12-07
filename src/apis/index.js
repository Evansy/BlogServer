/**
 * 改文件主要用来导出接口相关方法
 */
// import Vue from 'vue';
import API from './api-url';
import ajax from 'utils/ajax';

let send = (options, url, method) => {
    // 如果未传入url以及参数抛出异常
    if (!url) {
        throw new Error('url is null.');
        // throw new Error('url or options is null.');
    }

    // 如果没有设置请求方式默认请求方式为POST
    method = method || 'post';

    // 返回promise实例由用户处理
    return ajax.Axios[method](url, options);
};

/* 登录注册相关接口 */
export const login                      = options => send(options, API.login);                              // 登录接口
// export const login                      = options => send(options, API.login);                           // 登录接口

/* 文章相关接口 */
export const publishArticle             = options => send(options, API.publishArticle);                      // 发布文章
export const articleList                = options => send(options, API.articleList);                         // 文章列表
