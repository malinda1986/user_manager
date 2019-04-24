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

APIFunction.queryWeather = params => {
  params.key = 'i7sau1babuzwhycn'
  return request({
    url: `${apiPrefix}/weather/now.json`,
    data: params,
  })
}

APIFunction.userList = params => {
  params.key = 'i7sau1babuzwhycn'
  return request({
    url: `${apiPrefix}/profile/list`,
    data: params,
  })
}

APIFunction.userCreates = params => {
  params.key = 'i7sau1babuzwhycn'
  return request({
    url: `${apiPrefix}/profile`,
    method: 'post',
    data: params,
  })
}

APIFunction.getUsers = params => {
  params.key = 'i7sau1babuzwhycn'
  return request({
    url: `${apiPrefix}/profile/${params.id}`,
    method: 'get',
    data: params,
  })
}

APIFunction.updateUsers = params => {
  params.key = 'i7sau1babuzwhycn'
  return request({
    url: `${apiPrefix}/profile/${params.id}`,
    method: 'put',
    data: params,
  })
}

APIFunction.deleteUsers = params => {
  params.key = 'i7sau1babuzwhycn'
  return request({
    url: `${apiPrefix}/profile/${params.id}`,
    method: 'delete',
    data: params,
  })
}

APIFunction.uploadImage = params => {
  params.key = 'i7sau1babuzwhycn'
  return request({
    url: `${apiPrefix}/profile/upload`,
    method: 'post',
    data: params,
  })
}
export default APIFunction
