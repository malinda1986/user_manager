import request from 'utils/request'
import { apiPrefix } from 'utils/config'

import api from './api'

const gen = params => {
  let url = apiPrefix + params
  let method = 'GET'

  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = apiPrefix + paramsArray[1]
  }

  return function(data) {
    return request({
      url,
      data,
      method,
    })
  }
}

const APIFunction = {}
for (const key in api) {
  APIFunction[key] = gen(api[key])
}


APIFunction.userParams = params => {
  return request({
    url: `${apiPrefix}/profile/params`,
    data: params,
  })
}
APIFunction.updateUser = params => {
  return request({
    url: `${apiPrefix}/profile/${params.data.id}`,
    data: params,
    method:'put'
  })
}
APIFunction.queryUser = params => {
  return request({
    url: `${apiPrefix}/profile/${params.id}`,
    data: params,
  })
}

APIFunction.imageUpload = params => {
  return request({
    url: `${apiPrefix}/profile/upload`,
    data: params,
    method:'post'
  })
}

module.exports = APIFunction