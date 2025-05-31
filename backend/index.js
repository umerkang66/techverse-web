const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './.env' });

const server = require('./src/app');

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log('Db connection successful'));

server.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on port 3000');
});
