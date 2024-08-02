const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../../backend/models/tourModel.js');
const Review = require('../../backend/models/reviewModel');
const User = require('../../backend/models/userModel');

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
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'),
);

// IMPORT DATA INTO DATABASE

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
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
    await User.deleteMany();
    await Review.deleteMany();
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
