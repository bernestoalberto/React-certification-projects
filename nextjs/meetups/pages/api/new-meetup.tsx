import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup
const USERNAME = process.env.MONGO_DB_USERNAME;
const PASSWORD = process.env.MONGO_DB_PASSWORD;
const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.12qrf42.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0`
async function handler(req, res) {
	if (req.method === "POST") {
		const data = req.body;

		const client = await MongoClient.connect(
			URL
		);
		const db = client.db();

		const meetupsCollection = db.collection("meetups");

		const result = await meetupsCollection.insertOne(data);

		console.log(result);

		client.close();

		res.status(201).json({ message: "Meetup inserted!" });
	}
}

export default handler;
