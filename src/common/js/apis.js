import axios from 'axios'
import loading from '@/common/js/loading'
import {error} from './descriptor'
import Util from '@/common/util'

axios.interceptors.request.use(function (config) {
  loading.showLoading(config.loading)
  delete config.loading
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  loading.hideLoading()
  return response
}, function (error) {
  loading.hideLoading()
  if (error.response && error.response.status === 401) {
    Util.clearCookie('token')
    window.location = `${window.location.origin}/#/login`
  }
  return Promise.reject(error)
})

const ajax = {
  get: null,
  post: null,
  put: null,
  delete: null
}

const get = token => (url, params, loading) => axios({
  url,
  params: params || null,
  method: 'get',
  headers: {'Authorization': token},
  loading: loading || false
})

const post = token => (url, data, loading) => axios({
  url,
  data: data || null,
  method: 'post',
  headers: {'Authorization': token},
  loading: loading || false
})

const put = token => (url, data, loading) => axios({
  url,
  data: data || null,
  method: 'put',
  headers: {'Authorization': token},
  loading: loading || false
})

const deleteAjax = token => (url, params, loading) => axios({
  url,
  params: params || null,
  method: 'delete',
  headers: {'Authorization': token},
  loading: loading || false
})

export const initApisToken = (token) => {
  ajax.get = get(token)
  ajax.post = post(token)
  ajax.put = put(token)
  ajax.delete = deleteAjax(token)
}

export default class Apis {
  @error('登入接口异常')
  static loginAction (data, loading) {
    return axios({
      url: '/api/login/',
      data,
      method: 'post',
      loading: loading || false
    })
  }

  @error('注册用户接口异常')
  static registerNewManager (registerToken, params, loading) {
    return axios({
      url: `/api/user/${registerToken}/`,
      data: params,
      method: 'put',
      loading: loading || false
    })
  }

  @error('获取初始数据接口异常')
  static getAfterLoginData (params, loading) {
    return ajax.get('/api/after_login/', params, loading)
  }

  @error('新建公司接口异常')
  static createNewCompany (params, loading) {
    return ajax.post('/api/company/', params, loading)
  }

  @error('搜索公司接口异常')
  static searchCompany (params, loading) {
    return ajax.get('/api/company/', params, loading)
  }

  @error('删除公司接口异常')
  static deleteCompany (id, loading) {
    return ajax.delete(`/api/company/${id}/`, null, loading)
  }

  @error('新建管理员接口异常')
  static createNewManager (params, loading) {
    return ajax.post('/api/user/', params, loading)
  }

  @error('搜索用户接口异常')
  static searchUser (params, loading) {
    return ajax.get('/api/user/', params, loading)
  }

  @error('删除用户接口异常')
  static deleteUser (registerToken, loading) {
    return ajax.delete(`/api/user/${registerToken}/`, null, loading)
  }

  @error('搜索店铺接口异常')
  static searchStores (loading) {
    return ajax.get(`/api/stores/`, null, loading)
  }

  @error('搜索店铺接口异常')
  static searchStoresById (id, loading) {
    return ajax.get(`/api/stores/${id}/`, null, loading)
  }

  @error('新增店铺接口异常')
  static createNewStore (params, loading) {
    return ajax.post(' /api/stores/', params, loading)
  }

  @error('删除用户接口异常')
  static deleteStore (id, loading) {
    return ajax.delete(`/api/stores/${id}/`, null, loading)
  }

  @error('查询授权用户店铺接口异常')
  static searchUserStores (loading) {
    return ajax.get('/api/user-stores/', null, loading)
  }

  @error('新增授权用户店铺接口异常')
  static createNewUserStore (params, loading) {
    return ajax.post('/api/user-stores/', params, loading)
  }

  @error('删除用户接口异常')
  static deleteUserStore (id, loading) {
    return ajax.delete(`/api/user-stores/${id}/`, null, loading)
  }

  @error('查询授权用户店铺接口异常')
  static searchSKU (params, loading) {
    return ajax.get('/api/print-tag/', params, loading)
  }

  @error('搜索供货商接口异常')
  static searchSuppliers (params, loading) {
    return ajax.get('/api/supplier-search/', params, loading)
  }

  @error('获取地址列表接口异常')
  static searchAddressList (params, loading) {
    return ajax.get('/api/ship-from-address/', params, loading)
  }

  @error('新增地址接口异常')
  static createNewAddress (params, storeId, loading) {
    return ajax.post(`/api/ship-from-address/?store_id=${storeId}`, params, loading)
  }

  @error('删除地址接口异常')
  static deleteAddress (id, storeId, loading) {
    return ajax.delete(`/api/ship-from-address/${id}/?store_id=${storeId}`, null, loading)
  }

  @error('获取箱子列表接口异常')
  static searchOutboundList (params, loading) {
    return ajax.get(`/api/outbound/`, params, loading)
  }

  @error('获取新的箱子编号接口口异常')
  static getOutboundId (params, loading) {
    return ajax.post('/api/outbound/', params, loading)
  }

  @error('保存箱子接口口异常')
  static saveOutbounds (id, params, loading) {
    return ajax.put(`/api/outbound/${id}/`, params, loading)
  }

  @error('保存箱子接口口异常')
  static deleteOutbound (id, loading) {
    return ajax.delete(`/api/outbound/${id}/`, loading)
  }

  @error('获取供货商列表接口异常')
  static searchSupplierList (params, loading) {
    return ajax.get(`/api/supplier/`, params, loading)
  }

  @error('新增供货商接口异常')
  static createNewSupplie (params, loading) {
    return ajax.post('/api/supplier/', params, loading)
  }

  @error('删除供货商接口异常')
  static deleteSupplie (id, loading) {
    return ajax.delete(`/api/supplier/${id}/`, null, loading)
  }

  @error('更新供货商接口异常')
  static updateSupplie (id, params, loading) {
    return ajax.put(`/api/supplier/${id}/`, params, loading)
  }

  @error('搜索入库单接口异常')
  static searchInbound (params, loading) {
    return ajax.get('/api/inbound/', params, loading)
  }

  @error('获取入库单详情接口异常')
  static getInboundDetail (id, loading) {
    return ajax.get(`/api/inbound/${id}/`, loading)
  }

  @error('新增入库接口异常')
  static createNewInbound (params, loading) {
    return ajax.post('/api/inbound/', params, loading)
  }

  @error('保存入库单接口异常')
  static saveInbounds (id, params, loading) {
    return ajax.put(`/api/inbound/${id}/`, params, loading)
  }

  @error('获取商品列表接口异常')
  static searchWarehouseList (params, loading) {
    return ajax.get('/api/warehouse-sku/', params, loading)
  }

  @error('获取条码与商品id的映射接口异常')
  static getBarcodeMapping (params, loading) {
    return ajax.get('/api/barcode-mapping/', params, loading)
  }

  @error('创建运单接口异常')
  static createNewWaybill (params, loading) {
    return ajax.post('/api/waybill/', params, loading)
  }

  @error('搜索运单接口异常')
  static searchWaybills (params, loading) {
    return ajax.get('/api/waybill/', params, loading)
  }

  @error('编辑运单接口异常')
  static editWaybill (id, params, loading) {
    return ajax.put(`/api/waybill/${id}/`, params, loading)
  }

  @error('删除运单接口异常')
  static delWaybill (id, loading) {
    return ajax.delete(`/api/waybill/${id}/`, loading)
  }

  @error('创建货件接口异常')
  static createNewFbashipment (id, params, loading) {
    return ajax.post(`/api/shipment/?store_id=${id}`, params, loading)
  }

  @error('更新货件接口异常')
  static updateFbashipment (shiId, id, params, loading) {
    return ajax.put(`/api/shipment/${shiId}/?store_id=${id}`, params, loading)
  }

  @error('搜索运单接口异常')
  static searchPackageList (params, loading) {
    return ajax.get('/api/package-list/', params, loading)
  }

  @error('搜索运单接口异常')
  static getPackagePreview (id, loading) {
    return ajax.get(`/api/package-preview/${id}/`, null, loading)
  }

  @error('获取运单接口异常')
  static getWaybill (loading) {
    return ajax.get('/api/waybill/', null, loading)
  }

  @error('添加转运信息接口异常')
  static addTransportInfo (id, params, loading) {
    return ajax.post(`/api/track/?waybill_id=${id}`, params, loading)
  }

  @error('获取转运信息接口异常')
  static getTransportInfo (id) {
    return ajax.get(`/api/track/?waybill_id=${id}`, null, loading)
  }

  @error('取消亚马逊货件接口异常')
  static deleteShipment (shipmentId, id, loading) {
    return ajax.delete(`/api/shipment/${shipmentId}/?store_id=${id}`, null, loading)
  }

  @error('搜索商品信息接口异常')
  static getStoreInfo (params, loading) {
    return ajax.get(`/api/store-item/`, params, loading)
  }

  @error('获取运单详情接口异常')
  static getWaybillById (id, loading) {
    return ajax.get(`/api/waybill/${id}/`, null, loading)
  }

  @error('获取箱唛助手接口异常')
  static getShipments (id, loading) {
    return ajax.get(`/api/shipment-label-mapping/?shipment_id=${id}/`, null, loading)
  }
}
