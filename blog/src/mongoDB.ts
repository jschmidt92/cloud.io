import mongoose from 'mongoose'
import { DB_URL } from './config'

const connectToMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(
      'mongodb://root:password123@mongodb:27017/cloudio?authSource=admin'
    )
    console.log('MongoDB Connected!')
  } catch (error) {
    console.log(`An error occurred: ${error}`)
    process.exit(1)
  }
}

export default connectToMongoDB
