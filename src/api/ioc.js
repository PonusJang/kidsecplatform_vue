import request from '@/utils/request'

export function getIndicators(query,section) {
  return request({
    url: '/ioc/getIndicators',
    method: 'get',
    params: { query,section }
  })
}
