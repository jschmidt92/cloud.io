import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import CharacterService from './characterService'

const characterService = new CharacterService()

const getCharacterByKey = asyncHandler(async (req: Request, res: Response) => {
  const key = req.params.key
  const row = await characterService.getCharacterByKey(key)

  try {
    if (row) {
      res.status(200).json(row)
    } else {
      res.status(404)
      throw new Error(`Cannot find character with KEY ${key}`)
    }
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw e
    }
  }
})

const getArmoryByKey = asyncHandler(async (req: Request, res: Response) => {
  const key = req.params.key
  const row = await characterService.getArmoryByKey(key)

  try {
    if (row) {
      res.status(200).json(row)
    } else {
      res.status(404)
      throw new Error(`Cannot find character armory with KEY ${key}`)
    }
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw e
    }
  }
})

const getGarageByKey = asyncHandler(async (req: Request, res: Response) => {
  const key = req.params.key
  const row = await characterService.getGarageByKey(key)

  try {
    if (row) {
      res.status(200).json(row)
    } else {
      res.status(404)
      throw new Error(`Cannot find character garage with KEY ${key}`)
    }
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw e
    }
  }
})

const getMessagesByKey = asyncHandler(async (req: Request, res: Response) => {
  const key = req.params.key
  const row = await characterService.getMessagesByKey(key)

  try {
    if (row.length > 0) {
      res.status(200).json(row)
    } else {
      res.status(404)
      throw new Error(`Cannot find messages with KEY ${key}`)
    }
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw e
    }
  }
})

export { getCharacterByKey, getMessagesByKey, getArmoryByKey, getGarageByKey }
