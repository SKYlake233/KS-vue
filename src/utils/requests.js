import axios from 'axios'
import router from "@/router";
import {ElMessageBox} from "element-plus";

const request = axios.create({
    baseURL: 'http://127.0.0.1:8081',  // baseUrl + reqUrl  就是最终的结果
    timeout: 5000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    //默认使用json
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    let user = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null;
    if(user){
        config.headers['token'] = user.token;
    }
    return config
}, error => {
    return Promise.reject(error)
});


request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据  对象？
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        //没权限  去那刘
        if(res.code == "401"){
            ElMessageBox({
                type:"error",
                message:res.msg
            });
            router.push("/login");
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default request
