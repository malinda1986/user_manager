/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import pathToRegexp from 'path-to-regexp'
import {
  message,
} from 'antd';
import {
  queryUser, updateUser, userParams, imageUpload,
} from 'api'
import { pageModel } from 'utils/model'

export default modelExtend(pageModel, {
  namespace: 'UserModel',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    status: {},
    record: {count : 0},
    selectedTab:  'upcoming',
    searchKey: '',
    showLoading: true,
    profile: {
      _id: '5c1cd890933f27d92e401556',
      DisplayName: 'Malinda',
      RealName: 'Malinda',
      ProfilePicture: '',
      Birthday: '07/02/1986',
      Gender: '8f9d76ad-2c6b-4a98-8496-6165a2770a5e',
      Ethnicity:'5b3d1252-860f-459b-ab90-7a2914360dbf',
      Religion: 'a2bc1142-9b6a-41f3-a620-a39afb1304ab',
      Height: '89',
      Figure: '9c6ddf44-01ae-4fdb-acc9-b97f2882e4ef',
      MaritalStatus: '5a837767-7a11-487c-a243-7451c7b14c03',
      Occupation: 'sss',
      AboutMe: 'ddddd',
      Location: 'Aberdeen'
    },
    params: {
      locations: {},
      options: {gender:[], ethnicity:[], religion:[], figure:[], marital_status:[]}
    },
    isUploading: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/en/profile/:id').exec(pathname)
          if (match && match[1] !== ':id') {
            console.log('match===', match)
            dispatch({ type: 'query', payload: { id: match[1] } })
          } else {
            dispatch({ type: 'query', payload: { id: '5c1cd890933f27d92e401556' } })
          }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      yield put({
        type: 'setLoading',
        payload: {
          showLoading: true,
        },
      })

      yield put({
        type: 'querySuccess',
        payload: {
          list: [],
        },
      })

      const params = yield call(userParams, payload)
      const user = yield call(queryUser, payload)
      if(params.success){
          yield put({
            type: 'setState',
            payload: {
              params: params.response
            },
          })
      }
      if(user.success){
        yield put({
          type: 'setState',
          payload: {
            profile: user.response
          },
        })
    }
    },
    *update({ payload = {} }, { call, put }){
      yield put({
        type: 'setLoading',
        payload: {
          showLoading: true,
        },
      })

      yield put({
        type: 'querySuccess',
        payload: {
          list: [],
        },
      })

      const params = yield call(updateUser, payload)
      yield put({
        type: 'setLoading',
        payload: {
          showLoading: false,
        },
      })
      if(params.success){
          message.success('Profile has been successfully udated')
      } else {
          message.error('Something went wrong, Please pray for god!')
      }
    },
    *uploadImg({ payload = {} }, { call, put }){
      const params = yield call(imageUpload, payload);
      if(params.success){
        yield put({
          type: 'setProfilePic',
          payload: {
            path: params.response.imageInfo.fileName,
          },
        })
        message.success('Profile picture been successfully udated')
      } else {
        message.error('Something went wrong, Please pray for god!')
      }
    },


  },

  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload }
    },
    setProfilePic(state, { payload }) {
      const {profile} = state;
      const nState = state
      const nProfile = Object.assign({}, profile, {ProfilePicture: payload.path})
    
      return { ...nState, ...{profile: nProfile}}
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },

    setLoading(state, { payload }) {
      return { ...state, ...payload }
    },

    setTab(state, { payload }) {
      return { ...state, ...payload }
    },
  },
})
