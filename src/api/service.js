import request from '@/utils/request'

export function start(service) {
  return request({
    url: '/service/start',
    method: 'get',
    params: { service }
  })
}

export function stop(service) {
  return request({
    url: '/service/stop',
    method: 'get',
    params: { service }
  })
}

export function restart(service) {
  return request({
    url: '/service/restart',
    method: 'get',
    params: { service }
  })
}

export function info() {
  return request({
    url: '/service/info',
    method: 'get'
  })
}

