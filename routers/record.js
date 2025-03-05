import { Router } from 'express'
import * as record from '../controllers/record.js'
import * as auth from '../middlewares/auth.js'
import setFood from '../middlewares/setFood.js'

const router = Router()

router.post('/', auth.jwt, setFood, record.create)
router.get('/', auth.jwt, record.get)
router.get('/dayRecord', auth.jwt, record.getDR)
router.delete('/:id', auth.jwt, record.deleteRecord)

export default router
