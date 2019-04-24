import { router, pathMatchRegexp } from 'utils'
import { message } from 'antd'

import api from 'api'

const { loginUser } = api

export default {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload }, { put, call, select }) {
      try {
        const data = yield call(loginUser, payload)
        const { locationQuery } = yield select(_ => _.app)
        if (data.success) {
          const { from } = locationQuery
          yield put({ type: 'app/query' })
          if (!pathMatchRegexp('/login', from)) {
            if (from === '/') router.push('/user')
            else router.push(from)
          } else {
            router.push('/user')
          }
        } else {
          message.error('Invalid username or password')
        }
      } catch (e) {
        message.error('Invalid username or password')
      }
    },
  },
}
