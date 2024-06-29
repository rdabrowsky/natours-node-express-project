const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DATABASE_URL = process.env.MONGO_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then((con) => {
    // if (process.env.NODE_ENV === 'development') console.log(con.connections);
    console.log('Database Connected');
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
