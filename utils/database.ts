import { MongoClient, MongoClientOptions } from 'mongodb'

const url = 'mongodb+srv://mrchu:mr.chu1992@mrchu.btk8iub.mongodb.net/?retryWrites=true&w=majority'
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