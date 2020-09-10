import request from '@/utils/request'

export function start(app) {
  return request({
    url: '/service/start',
    method: 'get',
    params: { app }
  })
}

export function stop(app) {
  return request({
    url: '/service/stop',
    method: 'get',
    params: { app }
  })
}

export function restart(app) {
  return request({
    url: '/service/restart',
    method: 'get',
    params: { app }
  })
}

export function info() {
  return request({
    url: '/service/info',
    method: 'get'
  })
}

