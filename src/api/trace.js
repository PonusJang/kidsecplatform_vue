import request from '@/utils/request'

export function serverAnalyse(data) {
  return request({
    url: '/trace/serverAnalyse',
    method: 'post',
    data
  })
}

export function webAnalyse(data) {
  return request({
    url: '/trace/webAnalyse',
    method: 'post',
    data
  })
}

