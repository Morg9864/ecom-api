import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod;

export const connect = async () => {
	mongod = await MongoMemoryServer.create();
	const uri = mongod.getUri();
	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};

export const closeDatabase = async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
	await mongod.stop();
};

export const clearDatabase = async () => {
	const collections = mongoose.connection.collections;
	for (const key in collections) {
		await collections[key].deleteMany();
	}
};
