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
