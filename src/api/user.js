import { Router } from 'express'
import Dream from '../models/dream'
import User from '../models/user'
import md5 from 'md5'

const router = new Router()

router.post('/signup', async (req, res, next) => {
  if (req.session.user)
    return res.status(403)
  try {
    let user = new User({
      name: req.body.name,
      password: md5(req.body.password),
      email: req.body.email
    })
    await user.save()
    req.session.user = user._id
    res.status(201).send(user)
  } catch (err) {
    next(err)
  }
})

router.post('/signin', async (req, res, next) => {
  if (req.session.user)
    return res.status(403)
  try {
    let user = await User.findOne({
      name: req.body.name,
      password: md5(req.body.password),
    }).exec()
    if (!user)
      res.status(403).send({message: '用户不存在或者密码错误'})
    req.session.user = user._id
    res.status(200).send(user)
  } catch (err) {
    next(err)
  }
})

router.get('/signout', async (req, res, next) => {
  if (!req.session.user)
    return res.status(403).send()
  req.session.user = null
  return res.status(200).send({message: '登出成功'})
})

export default router
