const Recipe = require('../models/Recipe.model')
const User = require('../models/User.model')

const router = require('express').Router()

router.get('/', async (req, res, next) => {
  const allRecipes = await Recipe.find()
  res.json(allRecipes)
})

// GET details of one recipe
router.get('/:recipeId', async (request, response) => {
  const { recipeId } = request.params

  try {
    const oneRecipe = await Recipe.findById(recipeId).populate('owner')
    response.status(200).json({ recipe: oneRecipe })
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.post('/', async (req, res) => {
  try {
    const newRecipe = await Recipe.create({ ...req.body, owner: '6530f853ff091fa970dfdbb7' })
    // await User.findByIdAndUpdate('6530f853ff091fa970dfdbb7', { $push: { recipes: newRecipe._id } })
    res.status(201).json({ recipe: newRecipe })
  } catch (error) {
    res.status(500).json({ error })
  }
})

// PUT to update one recipe
router.put('/:recipeId', async (req, res) => {
  const { recipeId } = req.params
  try {
    const updateRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, { new: true })
    res.status(200).json({ recipe: updateRecipe })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

// DELETE to delete one recipe
router.delete('/:recipeId', async (req, res) => {
  const { recipeId } = req.params

  try {
    await Recipe.findByIdAndDelete(recipeId)
    res.status(204).send()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

module.exports = router
