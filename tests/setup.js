import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod;

export const connect = async () => {
	mongod = await MongoMemoryServer.create();
	const uri = mongod.getUri();
	await mongoose.connect(uri);
};

export const clearDatabase = async () => {
	const collections = mongoose.connection.collections;
	for (const key in collections) {
		await collections[key].deleteMany({});
	}
};

export const closeDatabase = async () => {
	await mongoose.connection.dropDatabase(); // OK pour in‑memory
	await mongoose.connection.close();
	await mongod.stop();
};
