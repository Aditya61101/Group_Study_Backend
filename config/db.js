const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://Ad7TyA:e6niGc2BFprNXGOF@groupstudycluster.dleu9wk.mongodb.net/?retryWrites=true&w=majority');
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports=connectDB;