import {Db, MongoClient} from 'mongodb';

let db: Db;

export const connectDB = async () => {
    try {
        const client = new MongoClient('mongodb://localhost:27017');
        await client.connect();
        console.log("Connected successfully to MongoDB server");
        db = client.db('test');
    } catch (error) {
        console.error("Could not connect to MongoDB", error);
        process.exit(1);
    }
}

export const getDB = () => {
    if (!db) {
        throw new Error("Call connectDB first");
    }
    return db;
}