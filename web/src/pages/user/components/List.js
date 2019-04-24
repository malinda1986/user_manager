import React, { PureComponent } from 'react'
import { routerRedux } from 'dva/router'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar } from 'antd'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
import Link from 'umi/link'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const {
      onDeleteItem,
      onEditItem,
      i18n,
      dispatch,
      onShowConfirm,
    } = this.props

    if (e.key === '1') {
      onShowConfirm(record, () => {
        onEditItem(record)
      })

      //onEditItem(record)
    } else if (e.key === '2') {
      onShowConfirm(record, () => {
        confirm({
          title: i18n.t`Are you sure delete this record?`,
          onOk() {
            onDeleteItem(record._id)
          },
        })
      })
    } else if (e.key === '3') {
      onShowConfirm(record, () => {
        dispatch(
          routerRedux.push({
            pathname: `/user/${record._id}`,
          })
        )
      })
    }
  }

  showConfirm = (record, e) => {}

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>Avatar</Trans>,
        dataIndex: 'ProfilePicture',
        key: 'ProfilePicture',
        width: 72,
        fixed: 'left',
        render: text => (
          <Avatar
            style={{ marginLeft: 8 }}
            src={`http://localhost:8080//${text}`}
          />
        ),
      },
      {
        title: <Trans>Full Name</Trans>,
        dataIndex: 'DisplayName',
        key: 'DisplayName',
        render: (text, record) => <Link to={`user/${record._id}`}>{text}</Link>,
      },
      {
        title: <Trans>Occupation</Trans>,
        dataIndex: 'Occupation',
        key: 'Occupation',
      },
      {
        title: <Trans>Gender</Trans>,
        dataIndex: 'Gender',
        key: 'Gender',
        render: text => <span>{text ? 'Male' : 'Female'}</span>,
      },
      {
        title: <Trans>Phone</Trans>,
        dataIndex: 'Mobile',
        key: 'Mobile',
      },
      {
        title: <Trans>Email</Trans>,
        dataIndex: 'Email',
        key: 'Email',
      },
      {
        title: <Trans>Address</Trans>,
        dataIndex: 'Address',
        key: 'Address',
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '3', name: i18n.t`View` },
                { key: '1', name: i18n.t`Update` },
                { key: '2', name: i18n.t`Delete` },
              ]}
            />
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={false}
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
