import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from 'src/components/HelloWorld';
import Login from 'src/views/login';
import Views from 'src/views/views';
import Create from 'src/views/create';
import ArticleManage from 'src/views/article-manage';
import DraftManage from 'src/views/draft-manage';

import member       from 'utils/member';

Vue.use(Router);

let route = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/views',
            name: 'Views',
            redirect: '/views/',
            component: Views,
            children: [
                {
                    path: '/',
                    redirect: '/create'
                },
                {
                    path: '/create',
                    name: 'Create',
                    component: Create
                },
                {
                    path: '/manage',
                    name: 'ArticleManage',
                    component: ArticleManage
                },
                {
                    path: '/draft',
                    name: 'DraftManage',
                    component: DraftManage
                }
            ]
        }
    ]
});


route.beforeEach((to, from, next) => {
    let getCredential = member.getCredential();

    if(getCredential || to.path === '/login' || to.params === '/'){
        next();
    } else {
        next({ path: '/login' });
    }
});

export default route;
