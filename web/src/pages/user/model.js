/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  queryUserList,
  createUser,
  removeUser,
  updateUser,
  removeUserList,
  userList,
  userCreates,
  deleteUsers,
  updateUsers,
  uploadImage,
} = api

export default modelExtend(pageModel, {
  namespace: 'user',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    file: '',
    showCofirm: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/user', location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const data = yield call(userList, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.response,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 1000,
              total: data.total,
            },
          },
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = yield call(deleteUsers, { id: payload })
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {},
        })
      } else {
        throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removeUserList, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(userCreates, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *upload({ payload }, { call, put }) {
      const data = yield call(uploadImage, payload)
      console.log(data)
      if (data.success) {
        yield put({
          type: 'setImage',
          payload: {
            file: data.response.imageInfo.fileName,
          },
        })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const data = yield call(updateUsers, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },

    setImage(state, { payload }) {
      return { ...state, ...payload }
    },

    showCofirm(state, { payload }) {
      return { ...state, ...payload }
    },
  },
})
