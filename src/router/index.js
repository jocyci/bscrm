import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve => require.ensure([], () => resolve(require('@/pages/home')), 'home-chunk')
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require.ensure([], () => resolve(require('@/pages/login')), 'login-chunk')
    },
    {
      path: '/register/:register_token',
      name: 'Register',
      component: resolve => require.ensure([], () => resolve(require('@/pages/register')), 'register-chunk')
    },
    {
      path: '/company-controll',
      name: 'companyControll',
      component: resolve => require.ensure([], () => resolve(require('@/pages/rootManage')), 'companyControll-chunk')
    },
    {
      path: '/user-controll',
      name: 'adminControll',
      component: resolve => require.ensure([], () => resolve(require('@/pages/adminManage/user')), 'adminControll-chunk')
    },
    {
      path: '/store-controll',
      name: 'storeControll',
      component: resolve => require.ensure([], () => resolve(require('@/pages/adminManage/store')), 'storeControll-chunk')
    },
    {
      path: '/user-store-controll',
      name: 'userStoreControll',
      component: resolve => require.ensure([], () => resolve(require('@/pages/adminManage/authorize')), 'userStoreControll-chunk')
    },
    {
      path: '/supplier-controll',
      name: 'supplierControll',
      component: resolve => require.ensure([], () => resolve(require('@/pages/adminManage/supplier')), 'supplierControll-chunk')
    },
    {
      path: '/inbound',
      name: 'inboundControll',
      component: resolve => require.ensure([], () => resolve(require('@/pages/worker/inbound/index')), 'inboundControll-chunk')
    },
    {
      path: '/inbound-detail/:id',
      name: 'inboundDetailControll',
      component: resolve => require.ensure([], () => resolve(require('@/pages/worker/inboundDetail')), 'inboundDetailControll-chunk')
    },
    {
      path: '/print-tag',
      name: 'tagControll',
      component: resolve => require.ensure([], () => resolve(require('@/pages/worker/tag')), 'tagControll-chunk')
    },
    {
      path: '/outbound',
      name: 'outboundControll',
      component: resolve => require.ensure([], () => resolve(require('@/pages/worker/outbound')), 'outboundControll-chunk')
    },
    {
      path: '/fba-shipment',
      name: 'shipmentControll',
      component: resolve => require.ensure([], () => resolve(require('@/pages/manager/shipment/index')), 'shipmentControll-chunk')
    },
    {
      path: '/sku-manage',
      name: 'assertControll',
      component: resolve => require.ensure([], () => resolve(require('@/pages/manager/assert.vue')), 'assertControll-chunk')
    },
    {
      path: '/waybill',
      name: 'waybillControll',
      component: resolve => require.ensure([], () => resolve(require('@/pages/manager/waybill/index')), 'waybillControll-chunk')
    }
  ]
})
