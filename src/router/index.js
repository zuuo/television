import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'recommend',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import ( /* webpackChunkName: "recommend" */ '../views/recommend/index.vue')
}, {
    path: '/1',
    name: 'recommend',
    component: () =>
        import ( /* webpackChunkName: "recommend" */ '../views/recommend/index.vue')
}, {
    path: '/2',
    name: 'recommend',
    component: () =>
        import ( /* webpackChunkName: "recommend" */ '../views/recommend/index.vue')
}, {
    path: '/3',
    name: 'recommend',
    component: () =>
        import ( /* webpackChunkName: "recommend" */ '../views/recommend/index.vue')
}, {
    path: '/4',
    name: 'recommend',
    component: () =>
        import ( /* webpackChunkName: "recommend" */ '../views/recommend/index.vue')
}, {
    path: '/5',
    name: 'recommend',
    component: () =>
        import ( /* webpackChunkName: "recommend" */ '../views/recommend/index.vue')
}, {
    path: '/6',
    name: 'recommend',
    component: () =>
        import ( /* webpackChunkName: "recommend" */ '../views/recommend/index.vue')
}, {
    path: '/7',
    name: 'recommend',
    component: () =>
        import ( /* webpackChunkName: "recommend" */ '../views/recommend/index.vue')
}, {
    path: '/8',
    name: 'recommend',
    component: () =>
        import ( /* webpackChunkName: "recommend" */ '../views/recommend/index.vue')
}]

const router = new VueRouter({
    routes
})

export default router