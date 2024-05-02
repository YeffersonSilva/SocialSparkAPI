import mongoose from 'mongoose';

const connection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/socialnetwork'); 
        console.log('Connected to database');


    } catch (error) {
        console.log(error);
        throw new Error('Error to connect to database');
    }
}
export default connection;  // Asegúrate de usar export default aquí
