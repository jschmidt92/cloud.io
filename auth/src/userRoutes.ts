import express from 'express'
import {
  createUser,
  deleteUser,
  getUsers,
  getCharacterByUserId,
  getUserById,
  updateUser
} from './userController'

const router = express.Router()

router.post('/', createUser)
router.get('/', getUsers)
router.get('/:id/character', getCharacterByUserId)
router.get('/:id', getUserById)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
