import mongoose from "mongoose";

const Connection = async (URL) => {
    try {
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log('database connected successfully');
    } catch (error) {
        console.log('error while connection to database', error.message);
    }
}

export default Connection;