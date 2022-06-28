import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layuot'
const Home = () => import('@/views/Home')
const My = () => import('@/views/My')
const News = () => import('@/views/NewS')
const RentHouse = () => import('@/views/RentHouse')
const Login = () => import('@/views/Login')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: 'home', component: Home },
      { path: 'my', component: My, name: 'my' },
      { path: 'news', component: News },
      { path: 'renthouse', component: RentHouse }
    ]
  },
  { path: '/login', component: Login }
]

const router = new VueRouter({
  routes
})

export default router
