import { createRouter, createWebHistory } from 'vue-router'

const routes =[
    {
        path:'/',
        name:'Manager',
        redirect:'/login'
    },
    {
        path:'/login',
        name:'login',
        component:()=>import("@/components/login")
    },
    {
        path:'/user',
        name:'user',
        component:()=>import("@/components/user")
    },
    {
        path:'/admin',
        name:'admin_layout',
        component:()=>import("@/layout/Layout_admin"),
        redirect: "/admin/device",
        children:[
            {
                path: '/admin/device',
                name: 'device',
                component: ()=>import("@/view/device"),

            },
            {
                path: '/admin/place',
                name: 'place',
                component: ()=>import("@/view/place"),

            },
            {
                path: '/admin/item',
                name: 'item',
                component: ()=>import("@/view/device_item"),

            },
            {
                path: '/admin/spot',
                name: 'spot',
                component: ()=>import("@/view/spot"),
            },
        ]
    },
    {
        path:'/register',
        name:'register',
        component:()=>import("@/components/register")
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router