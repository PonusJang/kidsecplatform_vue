import request from '@/utils/request'


export function getList(page, limit) {
  return request({
    url: '/dataSecurity/audit/getList',
    method: 'get',
    params: {page, limit}
  })
}

export function tag(id,tag) {
  return request({
    url: '/dataSecurity/audit/tag',
    method: 'get',
    params: {id,tag}
  })
}

export function push(id) {
  return request({
    url: '/dataSecurity/audit/push',
    method: 'get',
    params: {id}
  })
}

