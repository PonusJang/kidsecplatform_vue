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

export function findClientByIp(page, limit, ip) {
  return request({
    url: '/hids/findClientByIp',
    method: 'get',
    params: { page, limit, ip }
  })
}

export function findClientByHostname(page, limit, hostname) {
  return request({
    url: '/hids/findClientByHostname',
    method: 'get',
    params: { page, limit, hostname }
  })
}

export function findClientBySystem(page, limit, system) {
  return request({
    url: '/hids/findClientBySystem',
    method: 'get',
    params: { page, limit, system }
  })
}

export function setClientList(data) {
  return request({
    url: '/hids/setClientList',
    method: 'post',
    data
  })
}

export function getBlackListConfig() {
  return request({
    url: '/hids/getBlackListConfig',
    method: 'get'
  })
}

export function setBlackListConfig(data) {
  return request({
    url: '/hids/setBlackListConfig',
    method: 'post',
    data
  })
}

export function getClientConfig() {
  return request({
    url: '/hids/getClientConfig',
    method: 'get'
  })
}

export function setClientConfig(data) {
  return request({
    url: '/hids/setClientConfig',
    method: 'post',
    data
  })
}

export function getFilterConfig() {
  return request({
    url: '/hids/getFilterConfig',
    method: 'get'
  })
}

export function setFilterConfig(data) {
  return request({
    url: '/hids/setFilterConfig',
    method: 'post',
    data
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

export function setIntelligenceConfig(data) {
  return request({
    url: '/hids/setIntelligenceConfig',
    method: 'post',
    data
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

export function setServerConfig(data) {
  return request({
    url: '/hids/setServerConfig',
    method: 'post',
    data
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

export function setWhiteListConfig(data) {
  return request({
    url: '/hids/setWhiteListConfig',
    method: 'post',
    data
  })
}

export function getNoticeConfig() {
  return request({
    url: '/hids/getNoticeConfig',
    method: 'get'
  })
}

export function setNoticeConfig(data) {
  return request({
    url: '/hids/setNoticeConfig',
    method: 'post',
    data
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
    method: 'post',
    data
  })
}

export function download() {
  return request({
    url: '/hids/download',
    method: 'get'
  })
}

export function analysis(data) {
  return request({
    url: '/hids/analysis',
    method: 'post',
    data
  })
}

export function monitor(data) {
  return request({
    url: '/hids/monitor',
    method: 'post',
    data
  })
}

