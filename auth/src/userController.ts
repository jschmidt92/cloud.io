import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import CharacterService from './characterService'
import UserService from './userService'
// import createMQProducer from "../utils/producer";
// import { AMQP_URL, QUEUE_NAME } from "../config";

const userService = new UserService()
// const producer = createMQProducer(AMQP_URL as string, QUEUE_NAME as string);

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const row = await userService.createUser(req.body)
  // const msg = {
  //   action: "CREATEUSER",
  //   data: { row },
  // };
  // producer(JSON.stringify(msg));

  try {
    res.status(201).json(row)
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw e
    }
  }
})

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const rows = await userService.getUsers()
  // const msg = {
  //   action: "FETCHUSERS",
  //   data: { rows },
  // };
  // producer(JSON.stringify(msg));

  try {
    res.json(rows)
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw e
    }
  }
})

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id
  const row = await userService.getUserById(id)
  // const msg = {
  //   action: "FETCHUSER",
  //   data: { row },
  // };
  // producer(JSON.stringify(msg));

  try {
    if (row) {
      res.status(200).json(row)
    } else {
      res.status(404)
      throw new Error(`Cannot find user with ID ${id}`)
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

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const { uid, name } = req.body
  const row = await userService.updateUser(id, { uid, name })
  // const msg = {
  //   action: "UPDATEUSER",
  //   data: { row },
  // };
  // producer(JSON.stringify(msg));

  try {
    res.json(row)
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw e
    }
  }
})

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id
  const row = await userService.deleteUser(id)
  // const msg = {
  //   action: "DELETEUSER",
  //   data: { row },
  // };
  // producer(JSON.stringify(msg));

  try {
    if (row) {
      res.status(200).json(row)
    } else {
      res.status(404)
      throw new Error(`Cannot find user with ID ${id}`)
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

const getCharacterByUserId = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const row = await userService.getUserById(id)
    // const msg = {
    //   action: "FETCHUSER",
    //   data: { row },
    // };
    // producer(JSON.stringify(msg));

    if (!row) {
      res.status(404)
      throw new Error(`Cannot find user with ID ${id}`)
    }

    const uid = `${row.uid}`
    let characterData
    try {
      const response = await CharacterService.getCharacter(uid)
      characterData = response.data
    } catch (e) {
      console.error('Error fetching character data:', e)
    }

    let armoryData
    try {
      const response = await CharacterService.getArmory(uid)
      armoryData = response.data
    } catch (e) {
      console.error('Error fetching armory data:', e)
    }

    let garageData
    try {
      const response = await CharacterService.getGarage(uid)
      garageData = response.data
    } catch (e) {
      console.error('Error fetching garage data:', e)
    }

    let messageData
    try {
      const response = await CharacterService.getMessages(uid)
      messageData = response.data
    } catch (e) {
      console.error('Error fetching message data:', e)
    }

    res.status(200).json({
      // user: row,
      character: characterData,
      armory_unlocks: armoryData,
      garage_unlocks: garageData,
      messages: messageData
    })
  }
)

export {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getCharacterByUserId
}
