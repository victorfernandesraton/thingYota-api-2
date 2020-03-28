const
  User = require('../model/user.schema'),
  md5 = require('md5'),
  jwt = require('jsonwebtoken')

const auth = async (req, res, send) => {
  let {username, email, password} = req.body
  if ((!username && !email) || !password) {
    const data= ['username', 'password', 'email'].filter(key => !req.body.hasOwnProperty(key))
    return res.send(200, {
      res: false,
      error: {
        message: "The parans request not found",
        data
      }
    })
  }
  password = await md5(password.toString())
  let query = {
    username,
    password,
    email
  }

  if (email) {
    delete query['username']
  } else if (username) {
    delete query['email']
  }
  console.log(query)

  const user = await User.find(query);
  if (!user  || user.length == 0) {
    return res.send(404, {
      res: false,
      error: {message: "User not found", user}
    })
  }
  const token = await jwt.sign({
    username: user.username,
    password: user.password,
    id: user._id
  }, 'shhhhh');
  return res.send(200, {
    res: true,
    data: {
      token,
      user
    }
  })
}

module.exports = {
  auth
}
