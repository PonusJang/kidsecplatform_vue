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

export function getScanList() {
  return request({
    url: '/nessus/getPolicies',
    method: 'get'
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
    url: '/nessus/add',
    method: 'get',
    param: { sid }
  })
}

export function del(sid) {
  return request({
    url: '/nessus/delete',
    method: 'get',
    param: { sid }
  })
}

export function filterByIP(ip) {
  return request({
    url: '/nessus/filterByIP',
    method: 'get',
    param: { ip }
  })
}

export function getVulnInfo(ip) {
  return request({
    url: '/nessus/getVulnInfo',
    method: 'get',
    param: { ip }
  })
}

