import { Schema, model, ObjectId } from 'mongoose'

const schema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: 'users',
      required: [true, '使用者ID必填'],
    },
    food: {
      type: ObjectId,
      ref: 'foods',
      required: [true, '食物ID必填'],
    },
    quantity: {
      type: Number,
      required: [true, '食物份量必填'],
      min: [1],
    },
    weight: {
      type: Number,
      required: [true, '體重必填'],
      min: [0, '體重不可為負數'],
    },
    calorie: {
      type: Number,
      required: [true, '飲食紀錄的熱量必填'],
    },
    time: {
      type: String,
      required: [true, '時段必填'],
      enum: {
        values: ['早餐', '午餐', '晚餐'],
        message: '時段分類不符',
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

export default model('records', schema)
