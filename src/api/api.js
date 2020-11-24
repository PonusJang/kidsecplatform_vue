import request from '@/utils/request'

export function getApiMenu() {
  return request({
    url: '/apis/getApiMenu',
    method: 'get'
  })
}

export function getList(page, limit) {
  return request({
    url: '/apis/getList',
    method: 'get',
    params: {page, limit}
  })
}


export function update(data) {
  return request({
    url: '/apis/update',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/apis/add',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/apis/del',
    method: 'get',
    params: {id}
  })
}

export function addSub(data) {
  return request({
    url: '/apis/addSub',
    method: 'post',
    data
  })
}

export function delSub(id) {
  return request({
    url: '/apis/delSub',
    method: 'get',
    params: {id}
  })
}


export function updateSub(data) {
  return request({
    url: '/apis/updateSub',
    method: 'post',
    data
  })
}
