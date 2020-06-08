import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Userinfo from '@/views/Userinfo'
import Edit from '@/views/Edit'
import Article from '@/views/Article'
import EditCategory from '@/views/EditCategory'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Home,
    meta: {
      keepalive: true
    }
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/userinfo',
    component: Userinfo,
    meta: {
      istoken: true
    }
  },
  {
    path: '/edit',
    component: Edit,
    meta: {
      istoken: true
    }
  },
  {
    path: '/article/:id',
    component: Article
  },
  {
    path: '/editcategory',
    component: EditCategory
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('token') && !localStorage.getItem('id') && to.meta.istoken == true) {
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录')
    return
  }
  next()
})

export default router