const mongoose = require("mongoose");

async function startMongo() {
	const { MongoMemoryReplSet } = require("mongodb-memory-server");

	// This will create an new instance of "MongoMemoryReplSet" and automatically start all Servers
	const replset = await MongoMemoryReplSet.create({ replSet: { count: 3 } }); // This will create an ReplSet with 4 members

	const uri = replset.getUri();
	console.log("Mongo Connection Available:", uri);

	return uri;
}

async function setup() {
	if (mongoose.connection.readyState !== 1) {
		const connectionString = await startMongo();

		const mongoOptions = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};
		mongoose.Promise = global.Promise;
		await new Promise((res) => {
			console.log("STARTING CONNECT");
			mongoose.connect(connectionString, mongoOptions).then((mongooseObj) => {
				console.log(`Connected to: ${connectionString}`);
				res();
			});
		});
	}
}

module.exports = {
	mongoose,
	setup,
};
