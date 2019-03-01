export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'POST /user/login',

  queryUserList: '/v1/users',
  
  createUser: 'POST /user/:id',
  uploadUsers: 'POST /users/import',
  searchUsers: 'POST /users/search',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',
  queryUser: 'GET /v1/users/:id',
  updateUser: 'Patch /v1/users/:id',
  userParams: 'GET /v1/users/params',

}
