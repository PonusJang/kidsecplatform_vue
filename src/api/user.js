import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getList(page, limit) {
  return request({
    url: '/user/getList',
    method: 'get',
    params: { page, limit }
  })
}

export function update(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export function del(username) {
  return request({
    url: '/user/delete',
    method: 'get',
    params: { username }
  })
}

export function findByUsername(page, limit, username) {
  return request({
    url: '/user/findByUsername',
    method: 'get',
    params: { page, limit, username }
  })
}

export function getAuthMenu() {
  return request({
    url: '/user/getAuthMenu',
    method: 'get',

  })
}


export function getApiMenu() {
  return request({
    url: '/user/getApiMenu',
    method: 'get',

  })
}
