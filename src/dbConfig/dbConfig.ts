import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(`${process.env.MONGO_URI!}/nextAuth`)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDb connected successfully");
        })

        connection.on('error', (err) => {
            console.log("MongoDb connection error, make sure mongodb is running. " + err);
            process.exit()
        })

    } catch (error) {
        console.log("something goes wrong");
        console.log(error);
    }
}