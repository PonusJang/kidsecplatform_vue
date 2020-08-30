import request from '@/utils/request'

export function getList(page, limit) {
  return request({
    url: '/system/sysConfig/getList',
    method: 'get',
    params: { page, limit }
  })
}

export function update(data) {
  return request({
    url: '/system/sysConfig/update',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/system/sysConfig/add',
    method: 'post',
    data
  })
}

export function del(configItem) {
  return request({
    url: '/system/sysConfig/delete',
    method: 'get',
    params: { configItem }
  })
}

export function findByConfigItem(page, limit, configItem) {
  return request({
    url: '/system/sysConfig/findByConfigItem',
    method: 'get',
    params: { page, limit, configItem }
  })
}

