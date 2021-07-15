import request from '@/utils/request'

export function getList(page, limit) {
  return request({
    url: '/menu/getList',
    method: 'get',
    params: { page, limit }
  })
}

export function findByID(page, limit, id) {
  return request({
    url: '/menu/findByID',
    method: 'get',
    params: { page, limit ,id }
  })
}


export function add(data) {
  return request({
    url: '/menu/add',
    method: 'post',
   data
  })
}

export function update(data) {
  return request({
    url: '/menu/update',
    method: 'post',
    data
  })
}


export function del(id) {
  return request({
    url: '/menu/del',
    method: 'get',
    params: { id }
  })
}


export function getMenu() {
  return request({
    url: '/menu/getMenuTree',
    method: 'get',
  })
}
