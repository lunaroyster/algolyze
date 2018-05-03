import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '@/components/HomePage/index';
import ListPage from '@/components/ListPage/index';
import AlgorithmPage from '@/components/Algorithm/Page/index';
import AlgorithmTags from '@/components/Algorithm/Tags/index';
import Error404Page from '@/components/Error404Page/index';
import DevPage from '@/components/Dev';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/list',
      name: 'List',
      component: ListPage,
    },
    {
      path: '/a/:name',
      name: 'AlgorithmPage',
      component: AlgorithmPage,
    },
    {
      path: '/tags',
      name: 'AlgorithmTags',
      component: AlgorithmTags,
    },
    {
      path: '/dev',
      name: 'DevPages',
      component: DevPage,
      children: [
        {
          path: 'home',
          component: require('@/components/Dev/Home').default,
        }  
      ],
    },
    {
      path: '*',
      name: '404',
      component: Error404Page,
    },
  ],
});
