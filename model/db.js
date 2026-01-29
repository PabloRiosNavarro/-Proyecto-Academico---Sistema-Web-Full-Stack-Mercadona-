 // ./model/db.js
import mongoose from "mongoose";


const USER_DB = process.env.USER_DB;
const PASS = process.env.PASS;
const url = process.env.MONGO_URI ||`mongodb://root:example@localhost:27017/DAI?authSource=admin`
	
export default async function connectDB() {           
	try {
		await mongoose.connect(url);                   
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
	
	const dbConnection = mongoose.connection;
	dbConnection.once("open", (_) => {                  
		console.log(`Database connected: ${url}`);
	});
			 
	dbConnection.on("error", (err) => {                 
		console.error(`connection error: ${err}`);
	});
	return;
}