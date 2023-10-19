const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.json('All good in here')
})

router.get('/users', async (req, res, next) => {
  try {
    const allUsers = await User.find().populate('recipes')
    res.json(allUsers)
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
})

const User = require('../models/User.model')
const recipesRoutes = require('./recipes.routes')
router.use('/recipes', recipesRoutes)

module.exports = router
