import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import { stringify } from 'qs'
import Profile from './components/Profile'

@withI18n()
@connect(({ UserModel, loading }) => ({ UserModel, loading }))
class User extends PureComponent {
  render() {
    const { dispatch, UserModel, loading } = this.props
   
    const {
      showLoading,
      profile,
      params,
      isUploading
    } = UserModel
    
    const listProps = {
      showLoading,
      profile,
      params,
      isUploading,
      loading: loading.effects['UserModel/query'],
      update(item) {
        dispatch({
          type: 'UserModel/update',
          payload: {
            data: item
          },
        })
      },
      uploadImg(item) {
        dispatch({
          type: 'UserModel/uploadImg',
          payload: {
            data: item
          },
        })
      },
    }


    return (
      <Page inner>
        <Profile list={listProps}/>
      </Page>
    )
  }
}

User.propTypes = {
  UserModel: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default User
