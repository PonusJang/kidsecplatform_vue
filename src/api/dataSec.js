import request from '@/utils/request'

// 数据资产
export function getList(page, limit) {
  return request({
    url: '/dataSecurity/assets/getList',
    method: 'get',
    params: {page, limit}
  })
}

export function del(id) {
  return request({
    url: '/dataSecurity/assets/del',
    method: 'get',
    params: {id}
  })
}

export function update(data) {
  return request({
    url: '/dataSecurity/assets/update',
    method: 'get',
    data
  })
}

export function findByIP(page, limit, ip) {
  return request({
    url: '/dataSecurity/assets/findByIP',
    method: 'get',
    params: {page, limit, ip}
  })
}

export function findByName(page, limit, name) {
  return request({
    url: '/dataSecurity/assets/findByName',
    method: 'get',
    params: {page, limit, name}
  })
}

export function getDetail(id) {
  return request({
    url: '/dataSecurity/assets/getDetail',
    method: 'get',
    params: {id}
  })
}
