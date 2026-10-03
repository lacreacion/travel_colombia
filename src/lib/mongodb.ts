import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const options = {};
export const MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'Viajando_por_Colombia';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Por favor, agrega tu MONGODB_URI al archivo .env.local');
}

// Declaración global para evitar múltiples conexiones en desarrollo
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;