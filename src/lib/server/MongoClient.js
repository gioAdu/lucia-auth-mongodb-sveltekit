import { MONGODB_USER, MONGODB_PASS } from '$env/static/private';
import { MongoClient } from 'mongodb';
import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';

const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@lucia0.urkveuj.mongodb.net/?retryWrites=true&w=majority&appName=lucia0`;

const client = new MongoClient(uri);
await client.connect();

const db = client.db();
const User = db.collection('user');
const Session = db.collection('sessions');
const adapter = new MongodbAdapter(Session, User);

export { db, adapter, User };
