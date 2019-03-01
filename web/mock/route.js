import { Constant } from './_utils'
const { ApiPrefix } = Constant

const database = [
  {
    id: '2',
    name: 'Profile',
    icon: 'user',
    route: '/profile/5c1cd890933f27d92e401556',
  },
]
module.exports = {
  [`GET ${ApiPrefix}/routes`](req, res) {
    res.status(200).json(database)
  },
}
