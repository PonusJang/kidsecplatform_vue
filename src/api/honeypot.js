import request from '@/utils/request'

export function getAgentList() {
  return request({
    url: '/honeypot/getAgentList',
    method: 'get'
  })
}

export function deployAgent(data) {
  return request({
    url: '/honeypot/deployAgent',
    method: 'post',
    data
  })
}

export function getIPandRegion() {
  return request({
    url: '/honeypot/getIPandRegion',
    method: 'get'
  })
}

export function getAccount() {
  return request({
    url: '/honeypot/getAccount',
    method: 'get'
  })
}

export function getPassword() {
  return request({
    url: '/honeypot/getPassword',
    method: 'get'
  })
}

export function getAttackInfo() {
  return request({
    url: '/honeypot/getAttackInfo',
    method: 'get'
  })
}

export function getList(page, pageSize, type, colony) {
  return request({
    url: '/honeypot/getList',
    method: 'get',
    params: { page, pageSize, type, colony }
  })
}

export function getTopIP() {
  return request({
    url: '/honeypot/getTopIP',
    method: 'get'
  })
}

export function getTopWord() {
  return request({
    url: '/honeypot/getTopWord',
    method: 'get'
  })
}

export function getTopType() {
  return request({
    url: '/honeypot/getTopType',
    method: 'get'
  })
}

export function restart(teminal) {
  return request({
    url: '/honeypot/restart',
    method: 'get',
    params: { teminal }
  })
}
