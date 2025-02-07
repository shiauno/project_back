import passport from 'passport'
import { StatusCodes } from 'http-status-codes'
import JsonWebToken from 'jsonwebtoken'

export const login = (req, res, next) => {
  passport.authenticate('login', { session: false }, (error, user, info) => {
    if (!user || error) {
      // Local 驗證策略錯誤，缺少指定欄位的資料
      if (info.message === 'Missing credentials') {
        info.message = '請求格式錯誤'
      }
      if (info.message === '伺服器錯誤') {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: info.message,
        })
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: info.message,
        })
      }
    }
    req.user = user
    next()
  })(req, res, next)
}

export const jwt = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, data, info) => {
    console.log(error, data, info)
    if (error || !data) {
      if (info instanceof JsonWebToken.JsonWebTokenError) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: '使用者驗證錯誤',
        })
      } else if (info.message === '伺服器錯誤') {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: info.message,
        })
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: info.message,
        })
      }
    }
    req.user = data.user
    req.token = data.token
    next()
  })(req, res, next)
}
