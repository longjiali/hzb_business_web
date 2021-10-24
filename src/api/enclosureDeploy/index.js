import request from '@/utils/request'

/**
 * @name 查询车险附件配置信息
 * @param {object } param 
 * @returns 
 */
export function getAttConfCarConfig(param) {
  return request({
    url: `/attConf/carConfig/${param}`,
    method: 'get',
  })
}

/**
 * @name 查询雇主责任险附件配置信息
 */
export function getAttConfPolicyConfig () {
  return request({
    url: `/attConf/policyConfig`,
    method: 'get',
  })
}

/**
 * @name 新增雇主责任险附件标签配置
 * @param {*} params 
 * @returns 
 */
export function setAttConfSaveLabel (params) {
  return request({
    url: `/attConf/save/label`,
    method: 'post',
    data: params
  })
}

/**
 * @name 删除雇主责任险附件标签配置
 */
export function delAttConfDeleteLabel (params) {
  return request({
    url: `/attConf/delete/label`,
    method: 'post',
    data: params
  })
}

/**
 * @name 删除雇主责任险附件集合配置
 */
export function delAttConfDeleteItem (params) {
  return request({
    url: `/attConf/delete/item`,
    method: 'post',
    data: params
  })
}

/**
 * @name 新增或修改雇主责任险附件集合配置
 */
export function adddelAttConfUpsertItem (params) {
  return request({
    url: '/attConf/upsert/item',
    method: 'post',
    data: params
  })
}
