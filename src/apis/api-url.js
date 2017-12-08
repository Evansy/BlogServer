/**
 * API ur集合
 */

import { apiUrl } from 'settings';

export default {
    // 登录注册相关接口
    login:                      `${apiUrl}/api/login`,                                 // 登录接口
    // register:                   `${apiUrl}/api/Register`,                              // 注册接口

    // 文章相关
    publishArticle:             `${apiUrl}/api/article`,                                // 发布文章
    articleList:                `${apiUrl}/api/articles`,                               // 获取文章列表
    draft:                      `${apiUrl}/api/draft`,                                  // 获取草稿列表
    draftList:                  `${apiUrl}/api/drafts`                                  // 获取草稿列表

};
