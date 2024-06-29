const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel.js');

dotenv.config({ path: './config.env' });

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

// READ JSON FILE

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

// IMPORT DATA INTO DATABASE

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

// DELETE ALL DATA FROM DATABASE

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

const { argv } = process;

switch (argv.at(-1)) {
  case '--import':
    return importData();
  case '--delete':
    return deleteData();
  default:
    return process.exit();
}
