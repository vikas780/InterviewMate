const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  //to see token and user name
  // .json({user:{user.name}, token})
  res.status(StatusCodes.CREATED).json({ token })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide credentials')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const passCompare = await user.comparePass(password)
  if (!passCompare) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const token = user.createJWT()

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
  register,
  login,
}
