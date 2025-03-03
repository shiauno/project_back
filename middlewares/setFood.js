import Food from '../models/food.js'
import { StatusCodes } from 'http-status-codes'

const setFood = async (req, res, next) => {
  console.log('中介的:' + req.body.food)
  try {
    if (!req.body.food) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '未提供食物ID',
      })
    }

    const food = await Food.findById(req.body.food)
    console.log(food)
    if (!food) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '找不到食物',
      })
    }

    req.food = food
    next()
  } catch (error) {
    console.error(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '解析食物 ID 時發生錯誤',
      error: error.message,
    })
  }
}

export default setFood
