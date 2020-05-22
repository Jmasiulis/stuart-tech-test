import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apiRouter from './routes/api';
import * as apiResponse from './helpers/apiResponse';

dotenv.config();

// DB connection
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	//don't show the log when it is test
	if (process.env.NODE_ENV !== "test") {
		console.log("Connected to %s", MONGODB_URL);
		console.log("App is running ... \n");
		console.log("Press CTRL + C to stop the process. \n");
	}
}).catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});

const app = express();

app.listen(3000, function(){
	console.log('Listening...'); //Listening on port 3000
});

console.log(app)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/", apiRouter);

// throw 404 if URL not found
app.all("*", function(_req, res) {
	return apiResponse.notFoundResponse(res, "Page not found");
});

export default app;