export const LOGIN_QUERY =
  `query user($name:String, $password:String) {
      role(name:$name,password: $password)
      success
}`
