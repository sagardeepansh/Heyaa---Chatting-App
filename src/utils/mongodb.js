import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise;

console.log("uri===>", uri);

if (!uri || !dbName) {
  throw new Error('Please add your MongoDB URI and DB name to the environment variables.');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().catch(err => {
      console.error('Failed to connect to MongoDB', err);
      throw err;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect().catch(err => {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  });
}

export default clientPromise;
export const databaseName = dbName;
