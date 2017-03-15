import Vue from 'vue';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import axios from 'axios'
import VueRouter from 'vue-router';
// import AV from 'leancloud-storage'
// import lean from './lean';

import App from './App';
import register from 'components/views/register/register';
import startup from 'components/views/startup/startup';
import login from 'components/views/login/login';
import main from 'components/views/main/main';
import home from 'components/views/home/home';
import explore from 'components/views/explore/explore';
import me from 'components/views/me/me';
import wordDetail from 'components/wordDetail/wordDetail';
import shoot from 'components/views/shoot/shoot';

//lean
var APP_ID = 'nhKwEEEgzby6qiIn3Far8LoC-gzGzoHsz';
var APP_KEY = 'j9DjWm5Jf6crfxtu3Hvehi4p';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
// 浏览器的 Console 中设置 localStorage
localStorage.setItem('debug', 'leancloud*');

Vue.use(VueRouter);
Vue.use(Mint);
Vue.prototype.$http = axios
const router = new VueRouter({
  routes :[
    {
      path: '/startup',
      component: startup,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'register',
          component: register
        },
        {
          path: 'login',
          component: login
        }
      ]
    },
    {
      path:'/main',
      component:main,
      children:[
        {
          path:'home',
          component:home
        },
        {
          path:'explore',
          component:explore
        },
        {
          path:'me',
          component:me
        },
        {
          path:'wordDetail',
          component:wordDetail
        },
        {
          path:'shoot',
          component:shoot
        }

      ]
    },

  ]
});


const app = new Vue({
    el: '#app',
    router: router,
    render: h => h(App),
});