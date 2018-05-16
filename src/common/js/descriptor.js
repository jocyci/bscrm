import {Notice} from 'iview'

function errorHandle (errorMessage, handle) {
  if (handle) {
    handle(errorMessage || '操作失败')
  } else {
    Notice.error({
      title: '接口错误',
      desc: errorMessage || '操作失败'
    })
  }
}

export const error = function (errorMessage, errHandle) {
  return (target, propertyKey, descriptor) => {
    const original = descriptor.value
    if (typeof original === 'function') {
      descriptor.value = async (...args) => {
        let result
        try {
          result = await original.apply(target, args)
        } catch (e) {
          errorHandle(e.message, errHandle)
        }
        return result
      }
    }
    return descriptor
  }
}
