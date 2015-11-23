import Mongoose, { Schema } from 'mongoose'

let Dream = new Schema({
  // TODO: audio as File
  text: String,
  public: Boolean,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  favoritedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
})

Dream.virtual('createdAt').get(function () {
  return this._id.getTimeStamp()
})

export default Mongoose.model('Dream', Dream)
