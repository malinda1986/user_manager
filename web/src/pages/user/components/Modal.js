import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Modal,
  DatePicker,
  Upload,
  Icon,
} from 'antd'
import { Trans, withI18n } from '@lingui/react'
import moment from 'moment'

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
    const { item = {}, onOk, form, file } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
        ProfilePicture: file,
        id: item._id,
      }
      onOk(data)
    })
  }

  uploadProps = {
    accept: 'image/jpeg',
    action: file => {
      const genID = Math.floor(Date.now() / 1000)
      const reader = new FileReader()
      const { uploadImg } = this.props
      console.log(uploadImg, this.props)
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (!!reader.result) {
          var image = new Image()
          image.src = reader.result
          image.onload = function() {
            const uploadObj = { file: reader.result, id: genID, uid: file.uid }
            console.log(uploadObj)
            uploadImg(uploadObj)
          }
        } else {
          return
        }
      }
    },
    beforeUpload: file => {
      if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
      } else {
        return false
      }
    },
    listType: 'picture-card',
    fileList: [],
  }

  render() {
    const { item = {}, onOk, form, file, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`Name`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('DisplayName', {
              initialValue: item.DisplayName,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Position`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('Occupation', {
              initialValue: item.Occupation,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Birthday`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('Birthday', {
              initialValue: item.Birthday
                ? moment(item.Birthday, 'DD/MM/YYYY')
                : moment(),
              rules: [
                {
                  required: true,
                },
              ],
            })(<DatePicker />)}
          </FormItem>
          <FormItem label={i18n.t`Gender`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('Gender', {
              initialValue: item.Gender,
              rules: [
                {
                  required: true,
                  type: 'boolean',
                },
              ],
            })(
              <Radio.Group>
                <Radio value>
                  <Trans>Male</Trans>
                </Radio>
                <Radio value={false}>
                  <Trans>Female</Trans>
                </Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem label={i18n.t`Telephone`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('Telephone', {
              initialValue: item.Telephone,
              rules: [
                {
                  required: true,

                  message: i18n.t`The input is not valid phone!`,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Picture`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('Picture', {
              initialValue: item.Telephone,
              rules: [
                {
                  required: true,

                  message: i18n.t`The input is not valid phone!`,
                },
              ],
            })(
              <Upload
                {...this.uploadProps}
                name="avatar"
                fileList={
                  file
                    ? [
                        {
                          url: 'http://localhost:8080/' + file,
                          uid: Date.now(),
                        },
                      ]
                    : []
                }
                className="avatar-uploader"
                showUploadList={true}
              >
                <div>
                  <Icon type={this.isUploading ? 'loading' : 'plus'} />
                  <div className="ant-upload-text">Upload</div>
                </div>
              </Upload>
            )}
          </FormItem>
          <FormItem label={i18n.t`Mobile`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('Mobile', {
              initialValue: item.Mobile,
              rules: [
                {
                  required: true,

                  message: i18n.t`The input is not valid phone!`,
                },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem label={i18n.t`Email`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('Email', {
              initialValue: item.Email,
              rules: [
                {
                  required: true,
                  pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                  message: i18n.t`The input is not valid E-mail!`,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Address`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('Address', {
              initialValue: item.Address,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
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
