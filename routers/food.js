import { Router } from 'express'
import * as food from '../controllers/food.js'
import * as auth from '../middlewares/auth.js'
import upload from '../middlewares/upload.js'

const router = Router()

router.post('/', auth.jwt, auth.admin, upload, food.create)
router.get('/', food.get)
router.get('/all', auth.jwt, auth.admin, food.getAll)
router.get('/:id', food.getId)
router.patch('/:id', auth.jwt, auth.admin, upload, food.edit)
router.delete(':id', auth.jwt, auth.admin, food.deleteFood)

export default router
