import { Router } from 'express'
import Dream from '../models/dream'
import User from '../models/user'

const router = new Router()

// List all dreams
router.get('/all', async (req, res, next) => {
  try {
    let dreams = await Dream.find({public: true}).populate('createdBy')
      .sort({'_id': -1}).exec()
    return res.status(200).send(dreams)
  } catch (err) {
    next(err)
  }
})

// List my dreams
router.get('/my', async (req, res, next) => {
  try {

  } catch (err) {
    next(err)
  }
})

// List dreams in a day

// Create a dream
router.post('/new', async (req, res, next) => {
  if (!req.session.user)
    return res.status(403)
  try {
    console.log(req.session.user)
    let user = await User.findById(req.session.user).exec()
    if (!user)
      return res.status(403)
    let dream = new Dream({
      text: req.body.text,
      public: true,
      createdBy: user,
      favoritedBy: [],
    })
    await dream.save()
    res.status(201).send(dream)
  } catch (err) {
    next(err)
  }
})

// Publish a dream
router.post('/publish', async (req, res, next) => {
  if (!req.session.user)
    return res.status(403)
  try {
    let user = await User.findById(req.session.user).exec()
    let dream = await Dream.findById(req.body.dreamId).exec()
    if (!user || !dream || dream.createdBy != user._id)
      return res.status(403)
    dream.public = true
    await dream.save()
    res.status(200).send(dream)
  } catch (err) {
    next(err)
  }
})

// Favorite a dream

export default router
