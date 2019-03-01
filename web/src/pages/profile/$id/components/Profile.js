import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'
import config from 'utils/config'
import {
    Form, Input, Tooltip, Icon, Upload, Select, Row, Radio,
    Col, Checkbox, Button, AutoComplete, DatePicker,
  } from 'antd';
  
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'

const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 12 },
  },
};

@withI18n()
class Profile extends PureComponent {

  render() {
    const { onDeleteItem, onEditItem, i18n, ...profileProps } = this.props
    
    const {list} = profileProps
    const {params, profile, update, uploadImg, isUploading} = list
    const imagesToDisplay = []
   
    const { getFieldDecorator } = this.props.form;
    const {gender, ethnicity, religion, figure, marital_status } = params.options  
    
    const { _id = 1,
      DisplayName = undefined,
      RealName= undefined,
      ProfilePicture= undefined,
      Birthday= undefined,
      Gender= undefined,
      Ethnicity= undefined,
      Religion= undefined,
      Height= undefined,
      Figure= undefined,
      MaritalStatus= undefined,
      Occupation= undefined,
      Location=undefined,
      AboutMe= undefined} = profile


    if(ProfilePicture){
      const path = `${config.apiPath}/${ProfilePicture}`
      imagesToDisplay[0] = {
        url: path,
        uid: Date.now(),
      }
      
    }  
    
    const getOptions = (optionList) => {
      const options = [];
      _.each(optionList, val => {
          options.push( <Select.Option key={val.id} value={val.id}>{val.name}</Select.Option>)
      })
      return options
    };

    const getLocationOptions = () => {
      const options = [];
      _.each(params.locations.cities, val => {
          options.push( <Select.Option key={val.city} value={val.city}>{`${val.city} [${val.lat},${val.lon}]`}</Select.Option>)
      })
      return options
    };

    const getRadioOptions = (optionList) => {
      const options = [];
      _.each(optionList, val => {
          options.push(  <Radio key={val.id} value={val.id}>{val.name}</Radio>)
      })
      return options
    };

    const updateProfile = () => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
        values.id = _id;
        values._id = _id;
        values.ProfilePicture = ProfilePicture;
        update(values)
      });
    };

    const validateLength = (rule, value, callback, length) => {
      if(value === "" || value == null){
        return callback()
      }
      if(value.length > length){
        callback(`You can enter upto ${length} charactors`)
      }else {
        callback()
      }
    };

 

    const uploadProps = {
      accept: 'image/jpeg',
      action: (file) => {
          const genID = Math.floor(Date.now() / 1000);
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
              if (!!reader.result) {
                  var image = new Image();
                  image.src = reader.result;
                  image.onload = function() {
                    const uploadObj = {file: reader.result, id: genID, uid: file.uid}
                    console.log(uploadObj)
                    uploadImg(uploadObj)
                  };

              }
              else {
                  return;
              }
          }
      },
      beforeUpload: (file) => {         
          if(file.type === 'image/jpeg' || file.type === 'image/jpg'){
          }else {
              return false;
          }
      },
      listType:"picture-card",
      fileList: imagesToDisplay
    };
  
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
        <Form.Item
          {...formItemLayout}
          label={(
            <span>
              Display Name	&nbsp;
              <Tooltip title="Will visible on your profile">
              <Icon type="profile" style={{color:'green'}} />
            </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('DisplayName', {
            initialValue: DisplayName,
            rules: [
              { required: true, message: 'Please input your Display Name!', whitespace: true }, 
              {
                validator: (rule, value, callback)=>validateLength(rule, value, callback, 256)
              }
          ],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Real Name"
        >
          {getFieldDecorator('RealName', {
            initialValue: RealName,
            rules: [{
              required: true, message: 'Please input your Real Name	!',
            },
            {
              validator: (rule, value, callback)=>validateLength(rule, value, callback, 256)
            }
            ],
          })(
            <Input />
          )}
        </Form.Item>
        
        <Form.Item
          {...formItemLayout}
          label={(<span>
            Profile Picturee	&nbsp;
            <Tooltip title="Will visible on your profile">
            <Icon type="profile" style={{color:'green'}} />
          </Tooltip>
          </span>)}
          
        >
          <Upload {...uploadProps} 
            name="avatar"  
            className="avatar-uploader"
            showUploadList={true}
            >
              <div>
                <Icon type={isUploading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
              </div>
             
      
            </Upload>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={(
            <span>
              Birthday	&nbsp;
              <Tooltip title="Will visible on your profile">
              <Icon type="profile" style={{color:'green'}} />
            </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('Birthday', {
            initialValue: moment(Birthday, 'DD/MM/YYYY'),
            rules: [{ required: true, message: 'Please input your Birthday!'}],
          })(
            <DatePicker />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={(
            <span>
              Gender	&nbsp;
              <Tooltip title="Will visible on your profile">
              <Icon type="profile" style={{color:'green'}} />
            </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('Gender', {
            initialValue: Gender,
            rules: [{ required: true, message: 'Please select your Gender!', whitespace: true }],
          })(
            <Radio.Group>
              {getRadioOptions(gender)}
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={(
            <span>
              Ethnicity	&nbsp;
              <Tooltip title="Will visible on your profile">
              <Icon type="profile" style={{color:'green'}} />
            </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('Ethnicity', {
            initialValue:Ethnicity,
            rules: [
             
            ],
          })(
            <Select mode="single" 
                size='default'
                showSearch
                style={{ width: '100%' }}
                placeholder="Ethnicity"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}

            >
              {getOptions(ethnicity)}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={(
            <span>
              Religion	&nbsp;
              <Tooltip title="Will visible on your profile">
              <Icon type="profile" style={{color:'green'}} />
            </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('Religion', { initialValue: Religion })(
                <Select
                size='default'
                showSearch
                style={{ width: '100%' }}
                placeholder="Religion"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {getOptions(religion)}
              </Select>
              )
              }
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={(
            <span>
              Height	&nbsp;
              <Tooltip title="Will visible on your profile">
              <Icon type="profile" style={{color:'green'}} />
            </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('Height', {
            initialValue: Height,
            rules: [{
              required: true, message: 'Please input your Height!',
            }],
          })(
            <Input disabled={true} />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={(
            <span>
              Figure	&nbsp;
              <Tooltip title="Will visible on your profile">
              <Icon type="profile" style={{color:'green'}} />
            </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('Figure', {
            initialValue: Figure,
            rules: [
              { required: true, message: 'Please select your Figure!' },
            ],
          })(
            <Select mode="single" 
                size='default'
                showSearch
                style={{ width: '100%' }}
                placeholder="Figure"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}

            >
               {getOptions(figure)}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Marital Status	"
        >
          {getFieldDecorator('MaritalStatus', {
            initialValue:MaritalStatus,
            rules: [{
              required: true, message: 'Please input your Marital Status!',
            }],
          })(
            <Radio.Group>
              {getRadioOptions(marital_status)}
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Occupation"
        >
          {getFieldDecorator('Occupation', {
            initialValue:Occupation,
            rules: [
              {
                validator: (rule, value, callback)=>validateLength(rule, value, callback, 256)
              }
            ],
          })(
            <TextArea rows={4} />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={(
            <span>
              About Me	&nbsp;
              <Tooltip title="Will visible on your profile">
              <Icon type="profile" style={{color:'green'}} />
            </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('AboutMe', {
            initialValue:AboutMe,
            rules: [
              { required: true, message: 'Please tell about yourself!' },
              {
                validator: (rule, value, callback)=>validateLength(rule, value, callback, 5000)
              }
            ],
          })(
            <TextArea rows={4} />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={(
            <span>
              Location	&nbsp;
              <Tooltip title="Will visible on your profile">
              <Icon type="profile" style={{color:'green'}} />
            </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('Location', {
            initialValue: Location,
            rules: [{
              required: true, message: 'Please input your Location!',
            }],
          })(
            <Select mode="single" 
            size='default'
            showSearch
            style={{ width: '100%' }}
            placeholder="Location"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}

        >
           {getLocationOptions()}
        </Select>
          )}
        </Form.Item>
        <Row>
            <Col md={8} lg={8}>
                
            </Col>
            <Col md={8} lg={8}>
                <Button type='primary' onClick={()=>{updateProfile()}}>Update</Button>
            </Col>
        </Row>
      </Form>
      </div>
    )
  }
}

Profile.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default Form.create({ name: 'register' })(Profile)
