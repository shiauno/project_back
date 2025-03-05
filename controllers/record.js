import Record from '../models/record.js'
import User from '../models/user.js'
import Food from '../models/food.js'
import { StatusCodes } from 'http-status-codes'
import validator from 'validator'

export const create = async (req, res) => {
  try {
    const { time, quantity, food: foodId } = req.body

    // 確認使用者 ID 和食物 ID
    const { _id: userId } = req.user

    // 取得使用者的體重
    const user = await User.findById(userId)
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '找不到使用者',
      })
    }

    const { weight } = user

    // 取得食物的熱量
    const food = await Food.findById(foodId)
    if (!food) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '找不到食物',
      })
    }

    const { calorie } = food

    // 創建記錄
    const result = await Record.create({
      user: userId,
      food: foodId,
      weight,
      calorie: calorie * quantity,
      time,
      quantity,
      date: new Date(), // 添加日期字段
    })

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: '記錄創建成功',
      result,
    })
  } catch (error) {
    console.error(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '創建記錄時發生錯誤',
      error: error.message,
    })
  }
}

export const get = async (req, res) => {
  try {
    const { date, time } = req.query // 從查詢參數中獲取日期和時間段

    // 將日期轉換成當天的開始和結束時間
    const startDate = new Date(date)
    startDate.setHours(0, 0, 0, 0) // 設置為當天開始時間

    const endDate = new Date(date)
    endDate.setHours(23, 59, 59, 999) // 設置為當天結束時間

    console.log('開始時間:', startDate)
    console.log('結束時間:', endDate)

    // 查詢在特定時間範圍內創建且 time 欄位為指定值的記錄
    const records = await Record.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
      time: time,
      user: req.user._id,
    }).lean()
    // console.log('初始查詢結果:', JSON.stringify(records))

    // 查詢每個記錄中的 food 詳細資料
    for (const record of records) {
      const food = await Food.findById(record.food)
      if (food) {
        record.foodDetails = food // 將食物詳細資料添加到記錄中
      }
    }
    // console.log('後端測試' + JSON.stringify(records))
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: records,
    })
  } catch (error) {
    console.error(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '獲取記錄時發生錯誤',
      error: error.message,
    })
  }
}

export const getDR = async (req, res) => {
  try {
    try {
      const today = new Date()
      console.log('今天時間:', today)

      const records = await Record.find({
        date: { $gte: today },
      })

      res.status(StatusCodes.OK).json({ success: true, records })
    } catch (error) {
      console.error('無法獲取今日紀錄', error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '無法獲取今日紀錄',
        error: error.message,
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const deleteRecord = async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.id)) throw new Error('ID')

    await Record.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.OK).json({
      success: true,
      message: '飲食紀錄刪除成功',
    })
  } catch (error) {
    console.log(error)
    if (error.message === 'NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '找不到紀錄',
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '刪除失敗',
      })
    }
  }
}
