import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, '食物名稱必填'],
    },
    category: {
      type: String,
      required: [true, '食物分類必填'],
      enum: {
        values: [
          '穀物類',
          '糕餅點心類',
          '加工調理',
          '肉類',
          '蔬菜類',
          '魚貝類',
          '蛋類',
          '堅果種子類',
          '豆類',
          '油脂類',
          '飲料類',
          '水果類',
          '乳品類',
          '調味料及辛香料類',
          '其他類',
        ],
        message: '食物分類不符',
      },
    },
    image: {
      type: String,
      required: [true, '食物圖片必填'],
    },
    calorie: {
      type: Number,
      required: [true, '食物熱量必填'],
      min: [0, '食物熱量不可為負數'],
    },
    moisture: {
      type: Number,
      required: [true, '食物水分必填'],
      min: [0, '食物水分不可為負數'],
    },
    protein: {
      type: Number,
      required: [true, '食物蛋白質必填'],
      min: [0, '食物蛋白質不可為負數'],
    },
    fat: {
      type: Number,
      required: [true, '食物脂肪必填'],
      min: [0, '食物脂肪不可為負數'],
    },
    carbo: {
      type: Number,
      required: [true, '食物碳水必填'],
      min: [0, '食物碳水不可為負數'],
    },
    sodium: {
      type: Number,
      required: [true, '食物鈉必填'],
      min: [0, '食物鈉不可為負數'],
    },
    fibre: {
      type: Number,
      required: [true, '食物纖維必填'],
      min: [0, '食物纖維不可為負數'],
    },
    cholesterol: {
      type: Number,
      required: [true, '食物膽固醇必填'],
      min: [0, '食物膽固醇不可為負數'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

export default model('food', schema)
