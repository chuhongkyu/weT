import { MongoClient, MongoClientOptions } from 'mongodb'
import dotenv from 'dotenv';
dotenv.config();

const MONG_API = process.env.NEXT_PUBLIC_API_KEY

const url = `mongodb+srv://mrchu:${MONG_API}@mrchu.btk8iub.mongodb.net/?retryWrites=true&w=majority`
const options = { useNewUrlParser: true } as MongoClientOptions
let connectDB: Promise<MongoClient>;

declare global {
    var _mongo: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect()
}
export { connectDB }