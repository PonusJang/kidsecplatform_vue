import request from '@/utils/request'

export function getList(page, limit) {
  return request({
    url: '/plugin/getList',
    method: 'get',
    params: { page, limit }
  })
}

export function del(name) {
  return request({
    url: '/plugin/delete',
    method: 'get',
    params: { name }
  })
}

export function findByName(page, limit, name) {
  return request({
    url: '/plugin/findByName',
    method: 'get',
    params: { page, limit, name }
  })
}

export function uploadPlugin(fileData) {
  return request({
    url: '/plugin/uploadPlugin',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8'
    },
    data: fileData
  })
}
