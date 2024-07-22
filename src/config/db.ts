import mongoose from 'mongoose';
import logger from '../middlewares/logger'; // Adicionando middleware de logger

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        logger('info', 'Conexão com o MongoDB estabelecida com sucesso');
    } catch (error: any) {
        logger('error', 'Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;
