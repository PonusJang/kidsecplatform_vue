import request from '@/utils/request'

export function getList(page, limit) {
  return request({
    url: '/depart/getList',
    method: 'get',
    params: { page, limit }
  })
}

export function getDepart() {
  return request({
    url: '/depart/getDepart',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: '/depart/update',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/depart/add',
    method: 'post',
    data
  })
}

export function del(department) {
  return request({
    url: '/depart/delete',
    method: 'get',
    params: { department }
  })
}

export function findByDepart(page, limit, depart) {
  return request({
    url: '/depart/findByDepart',
    method: 'get',
    params: { page, limit, depart }
  })
}
