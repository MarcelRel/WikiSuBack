import {MongoClient} from 'mongodb';


export const client = new MongoClient('mongodb://localhost:27017');
client.connect();

export const db = client.db('WikiSU');
export const document = db.collection('Documents');

