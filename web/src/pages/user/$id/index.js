import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { connect } from 'dva'
import { Page } from 'components'
import styles from './index.less'

const { Meta } = Card

@connect(({ userDetail }) => ({ userDetail }))
class UserDetail extends PureComponent {
  render() {
    const { userDetail } = this.props
    const { data } = userDetail
    const content = []
    for (let key in data) {
      if ({}.hasOwnProperty.call(data, key)) {
        if (key == 'DisplayName') {
        }
        content.push(
          <div key={key} className={styles.item}>
            <div>{key}</div>
            <div>{String(data[key])}</div>
          </div>
        )
      }
    }
    return (
      <Page inner>
        <div className={styles.content}>
          <div className={styles.item}>
            <div>Name</div>
            <div>{String(data['DisplayName'])}</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.item}>
            <div>Gender</div>
            <div>{data['Gender'] ? 'Male' : 'Female'}</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.item}>
            <div>Address</div>
            <div>{data['Address']}</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.item}>
            <div>Telephone</div>
            <div>{data['Telephone']}</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.item}>
            <div>Mobile</div>
            <div>{data['Mobile']}</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.item}>
            <div>Birthday</div>
            <div>{data['Birthday']}</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.item}>
            <div>Email</div>
            <div>{data['Email']}</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.item}>
            <div>Occupation</div>
            <div>{data['Occupation']}</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.item}>
            <div>Occupation</div>
            <div>{data['Password']}</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.item}>
            <div>ProfilePicture</div>
            <div>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src={`http://localhost:8080/${data['ProfilePicture']}`}
                  />
                }
              />
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

UserDetail.propTypes = {
  userDetail: PropTypes.object,
}

export default UserDetail
