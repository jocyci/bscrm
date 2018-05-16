import {Message} from 'iview'

function responseMessage (data, successStatus, str, disable) {
  if (data === null || data === undefined) {
    Message.error('操作失败')
    return true
  }
  if (data && data.status === successStatus) {
    if (!disable) {
      Message.success(str || '请求成功')
    }
    return false
  } else {
    Message.error(data.msg || '操作失败')
    return true
  }
}

function requiredInVerify (value, str, reg) {
  if (reg) {
    if (reg.test(value)) {
      return false
    } else {
      Message.warning(str || '字段不合法')
      return true
    }
  }
  if (value) {
    return false
  } else {
    Message.warning(`${str}为必填` || '字段不合法')
    return true
  }
}

export default {
  install (Vue) {
    Vue.prototype.$responseMessage = responseMessage
    Vue.prototype.$requiredInVerify = requiredInVerify
  }
}
