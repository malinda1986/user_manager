import React, { PureComponent } from 'react'
import Redirect from 'umi/redirect'
import { withI18n } from '@lingui/react'

@withI18n()
class Index extends PureComponent {
  render() {
    const { i18n } = this.props
    return <Redirect to={i18n.t`/profile/5c1cd890933f27d92e401556`} />
  }
}

export default Index
