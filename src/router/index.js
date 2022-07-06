import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layuot'
const Home = () => import('@/views/Home')
const My = () => import('@/views/My')
const News = () => import('@/views/NewS')
const RentHouse = () => import('@/views/RentHouse')
const Login = () => import('@/views/Login')
const Release = () => import('@/views/release')
const CollEction = () => import('@/views/Collection')
const MyLease = () => import('@/views/MyLease')
const CitySele = () => import('@/views/CitySele')
const HouseSearch = () => import('@/views/release/components/HouseSearch.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'home', component: Home },
      { path: 'my', component: My, name: 'my' },
      { path: 'news', component: News },
      { path: 'renthouse', component: RentHouse }
    ]
  },
  { path: '/login', component: Login },
  { path: '/release', component: Release },
  { path: '/collection', component: CollEction },
  { path: '/mylease', component: MyLease },
  { path: '/citysele', component: CitySele },
  { path: '/housesearch', component: HouseSearch, name: 'housesearch' }
]

const router = new VueRouter({
  routes
})

export default router
