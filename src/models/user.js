import Mongoose, { Schema } from 'mongoose'

let User = new Schema({
  name: {
    type: String,
    index: {
      unique: true
    }
  },
  password: String,
  email: String
})

User.virtual('createdAt').get(function () {
  return this._id.getTimeStamp()
})

export default Mongoose.model('User', User)
