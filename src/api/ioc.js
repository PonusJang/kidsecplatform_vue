import request from '@/utils/request'

export function getIndicators(query) {
  return request({
    url: '/ioc/getIndicators',
    method: 'get',
    params: { query }
  })
}
