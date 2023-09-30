import express, { Request, Response } from 'express'
import {
  getArmoryByKey,
  getCharacterByKey,
  getGarageByKey,
  getMessagesByKey
} from './characterController'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.json({ msg: 'Welcome to the Character Micro-Service' })
})
router.get('/:key', getCharacterByKey)
router.get('/:key/armory', getArmoryByKey)
router.get('/:key/garage', getGarageByKey)
router.get('/:key/messages', getMessagesByKey)

export default router
