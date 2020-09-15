import request from '@/utils/request'

// Acunetix API
export function getStatics() {
  return request({
    url: '/acunetix/getStatics',
    method: 'get'

  })
}

export function getTargetList(page, limit) {
  return request({
    url: '/acunetix/getTargetList',
    method: 'get',
    params: { page, limit }
  })
}

export function filterTarget(page, limit, param) {
  return request({
    url: '/acunetix/filterTarget',
    method: 'get',
    params: { page, limit, param }
  })
}

export function deleteTarget(target_id) {
  return request({
    url: '/acunetix/deleteTarget',
    method: 'get',
    params: { target_id }
  })
}

export function getScanList(page, limit) {
  return request({
    url: '/acunetix/getScanList',
    method: 'get',
    params: { page, limit }
  })
}

export function filterScan(page, limit, param) {
  return request({
    url: '/acunetix/filterScan',
    method: 'get',
    params: { page, limit, param }
  })
}

// url desc criti
export function addTarget(data) {
  return request({
    url: '/acunetix/addTarget',
    method: 'post',
    data
  })
}

export function startScan(target_id) {
  return request({
    url: '/acunetix/startScan',
    method: 'get',
    params: { target_id }
  })
}

export function stopScan(scan_id) {
  return request({
    url: '/acunetix/stopScan',
    method: 'get',
    params: { scan_id }
  })
}

export function deleteScan(scan_id) {
  return request({
    url: '/acunetix/deleteScan',
    method: 'get',
    params: { scan_id }
  })
}

export function getStatus(scan_id) {
  return request({
    url: '/acunetix/getStatus',
    method: 'get',
    params: { scan_id }
  })
}

export function getVulnerabilitiesInfo(scan_id) {
  return request({
    url: '/acunetix/getVulnerabilitiesInfo',
    method: 'get',
    params: { scan_id }
  })
}

export function getReports(scan_id) {
  return request({
    url: '/acunetix/getReports',
    method: 'get',
    params: { scan_id }
  })
}

// Nessus API
