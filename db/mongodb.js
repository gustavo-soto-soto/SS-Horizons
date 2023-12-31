import mongoose from "mongoose";

const { MONGODB_URI } = process.env

if (!MONGODB_URI) throw new Error("MONGODB_URI NOT DEFINED")

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(MONGODB_URI)

        if (connection.readyState === 1){
            console.log("MongoDB connected")
            return Promise.resolve(true)
        }

    } catch (error) {
        console.error(error)
        return Promise.reject(false)
    }
}

export const getModelNames = async () => {
    try {
        const { connection } = await mongoose.connect(MONGODB_URI)
        const collections = await connection.db.listCollections().toArray();
        const collectionNames = collections.map((collection) => collection.name);
        return collectionNames;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};