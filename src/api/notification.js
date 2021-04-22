import request from '@/utils/request'

export function getList(page, limit) {
  return request({
    url: '/notice/getList',
    method: 'get',
    params: { page, limit }
  })
}

export function read(id) {
  return request({
    url: '/notice/read',
    method: 'get',
    params: { id }
  })
}


export function getReceive() {
  return request({
    url: '/notice/getReceive',
    method: 'get',
  })
}

export function sendNotice(data) {
  return request({
    url: '/notice/sendNotice',
    method: 'post',
    data
  })
}
