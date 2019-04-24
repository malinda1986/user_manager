import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, message } from 'antd'
import { Trans, withI18n } from '@lingui/react'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
@withI18n()
@Form.create()
class UserModal extends PureComponent {
  handleOk = () => {
    const { currentItem = {}, form, callback, dispatch } = this.props
    const { validateFields, getFieldsValue } = form
    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      if (data.Password === currentItem.Password) {
        dispatch({
          type: 'user/showCofirm',
          payload: {
            showCofirm: false,
          },
        })
        callback()
      } else {
        message.error('Your passwor is not correct!')
      }
    })
  }

  handleCancel = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'user/showCofirm',
      payload: {
        showCofirm: false,
      },
    })
  }

  render() {
    const {
      item = {},
      onOk,
      form,
      file,
      i18n,
      showCofirm,
      ...modalProps
    } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal
        {...modalProps}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        title="Two Level Autentication System"
        visible={showCofirm}
      >
        <Form layout="horizontal">
          <FormItem label={i18n.t`Password`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('Password', {
              initialValue: item.Password,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input type="password" />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default UserModal
