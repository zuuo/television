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
}]

const router = new VueRouter({
    routes
})

export default router