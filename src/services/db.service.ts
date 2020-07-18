import mongoose from 'mongoose';
import config from 'config';

const MONGO_URL: string = config.get('mongoURL');
const POOL_SIZE: Number = config.get('connectionPoolSize');

export class DbService {
    constructor() {
        try {
            let mongoConnect = mongoose.connect(MONGO_URL, {
              useNewUrlParser: true,
              useCreateIndex: true,
              useFindAndModify: false,
              useUnifiedTopology: true,
              poolSize: +POOL_SIZE
            })
            console.log('MongoDB is connected');
            return mongoConnect;
          } catch (err) {
            console.error(err.message)
            process.exit(1)
          }
    }
}