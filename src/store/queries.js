export const LOGIN_QUERY =
  `query user($username:String, $password:String) {
    user(username:$username, password:$password){
      role,
      info
    }
}`

export const GET_USER_INFO_QUERY =
  `{
    user{
      role,
      info
    }
}`

