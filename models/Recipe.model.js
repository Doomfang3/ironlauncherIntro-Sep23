const { Schema, model } = require('mongoose')

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    instructions: { type: String, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const Recipe = model('Recipe', recipeSchema)

module.exports = Recipe
