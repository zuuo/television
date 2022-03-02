// 1.引入axios
// 2.axios.create方法创建实例
// 3.使用实例对象创建请求拦截器
// 4.使用实例创建响应拦截器
// 5.export抛出实例对象
// 6.main.js中引入request文件对象
import axios from 'axios'
// import store from '@/store/index'
const Server = axios.create({
        baseURL: '',
        timeout: 3000
    })
    //使用Server创建请求拦截器
Server.interceptors.request.use(function(config) {
        // store.commit('setLoading',true) //设置loading效果
        return config;
    }, function(error) {
        return Promise.reject(error)
    })
    //使用Server创建响应拦截器
Server.interceptors.response.use(function(response) {
    console.log(response);
    //判断接口返回的数据成功，直接返回数据中data数据
    if (response.status == 200) {
        setTimeout(() => {
            // store.commit('setLoading',false) //设置loading效果
        }, 1000);
        return response.data;
    }
    return response;
}, function(error) {
    return Promise.reject(error);
});
export default Server