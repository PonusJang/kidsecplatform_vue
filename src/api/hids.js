import request from '@/utils/request'

export function dbinfo() {
  return request({
    url: '/hids/dbinfo',
    method: 'get'
  })
}

export function publickey() {
  return request({
    url: '/hids/publickey',
    method: 'get'
  })
}

export function serverlist() {
  return request({
    url: '/hids/serverlist',
    method: 'get'
  })
}

export function getClientList(page, limit) {
  return request({
    url: '/hids/getClientList',
    method: 'get',
    params: { page, limit }
  })
}

export function getBlackListConfig() {
  return request({
    url: '/hids/getBlackListConfig',
    method: 'get'
  })
}

export function getClientConfig() {
  return request({
    url: '/hids/getClientConfig',
    method: 'get'
  })
}

export function getFilterConfig() {
  return request({
    url: '/hids/getFilterConfig',
    method: 'get'
  })
}

export function getInfoList(page, limit) {
  return request({
    url: '/hids/getInfoList',
    method: 'get',
    params: { page, limit }
  })
}

export function getIntelligenceConfig() {
  return request({
    url: '/hids/getIntelligenceConfig',
    method: 'get'

  })
}

export function getNoticeList(page, limit) {
  return request({
    url: '/hids/getNoticeList',
    method: 'get',
    params: { page, limit }
  })
}

export function getServerConfig(page, limit) {
  return request({
    url: '/hids/getServerConfig',
    method: 'get',
    params: { page, limit }
  })
}

export function getRules(page, limit) {
  return request({
    url: '/hids/getRules',
    method: 'get',
    params: { page, limit }
  })
}

export function getWhiteListConfig() {
  return request({
    url: '/hids/getWhiteListConfig',
    method: 'get'
  })
}
export function getNoticeConfig() {
  return request({
    url: '/hids/getNoticeConfig',
    method: 'get'
  })
}

export function getTaskList(page, limit) {
  return request({
    url: '/hids/getTaskList',
    method: 'get',
    params: { page, limit }
  })
}

export function addTask(data) {
  return request({
    url: '/hids/addTask',
    method: 'get',
    data
  })
}

export function download() {
  return request({
    url: '/hids/download',
    method: 'get'
  })
}

export function analysis(page, limit, param) {
  return request({
    url: '/hids/analysis',
    method: 'get',
    params: { page, limit, param }
  })
}

