import request from '@/utils/request'

// Nessus API
export function getStatics() {
  return request({
    url: '/nessus/getStatics',
    method: 'get'
  })
}

export function getPolicies() {
  return request({
    url: '/nessus/getPolicies',
    method: 'get'
  })
}

export function getScanList(page, limit) {
  return request({
    url: '/nessus/getScanList',
    method: 'get',
    params: { page, limit }
  })
}

export function add(data) {
  return request({
    url: '/nessus/add',
    method: 'post',
    data
  })
}

export function launch(sid) {
  return request({
    url: '/nessus/launch',
    method: 'get',
    params: { sid }
  })
}

export function del(sid) {
  return request({
    url: '/nessus/delete',
    method: 'get',
    params: { sid }
  })
}

export function filterByIP(ip, page, limit) {
  return request({
    url: '/nessus/filterByIP',
    method: 'get',
    params: { ip, page, limit }
  })
}

export function getVulnInfo(ip) {
  return request({
    url: '/nessus/getVulnInfo',
    method: 'get',
    params: { ip }
  })
}

