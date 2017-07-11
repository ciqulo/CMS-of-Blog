export const LOGIN_QUERY =
  `query user($name:String, $password:String) {
    user(name:$name, password:$password){
      role,
      info
    }
}`

