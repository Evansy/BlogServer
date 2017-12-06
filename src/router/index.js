import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from 'src/components/HelloWorld';
import Login from 'src/views/login';
import Views from 'src/views/views';
import Create from 'src/views/create';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/views'
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
                    name: 'Create',
                    component: Create
                }
            ]
        }
    ]
});
