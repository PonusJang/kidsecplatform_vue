import request from '@/utils/request'

// 数据资产
export function getDBS() {
  return request({
    url: '/dataSecurity/acl/getDBS',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/dataSecurity/acl/data',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/dataSecurity/acl/del',
    method: 'get',
    params: {id}
  })
}

export function update(data) {
  return request({
    url: '/dataSecurity/acl/update',
    method: 'post',
    data
  })
}

export function getDetail(id) {
  return request({
    url: '/dataSecurity/acl/getDetail',
    method: 'get',
    params: {id}
  })
}
