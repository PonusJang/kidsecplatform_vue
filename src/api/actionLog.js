import request from '@/utils/request'


export function getList(page, limit) {
  return request({
    url: '/actionLog/getList',
    method: 'get',
    params: {page, limit}
  })
}

