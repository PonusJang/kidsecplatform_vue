import request from '@/utils/request'


export function getList(page, limit) {
  return request({
    url: '/dataSecurity/alert/getList',
    method: 'get',
    params: {page, limit}
  })
}

export function push(id) {
  return request({
    url: '/dataSecurity/alert/push',
    method: 'get',
    params: {id}
  })
}

export function tagFalse(id) {
  return request({
    url: '/dataSecurity/alert/tagFalse',
    method: 'get',
    params: {id}
  })
}

