import * as http from 'http';
import mongoose from 'mongoose';
import app from './app';
import mainConfig from './env';

// connect to mongo db
// mongoose.connect(mainConfig.MONGO_URL, {
//   autoIndex: true
// }, async (err) => {
//   if (err) console.log(err);
//   console.log(`Mongodb connected on port 27017 in ${mainConfig.NODE_ENV} server`);
// });


let server = http.createServer(app).listen(mainConfig.PORT, () => {
  console.log(`Server started on port ` + mainConfig.PORT + ` in ${mainConfig.NODE_ENV} mode`);
});

export default server;