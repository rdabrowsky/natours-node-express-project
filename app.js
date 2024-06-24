const express = require('express');
const morgan = require('morgan');

const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

app.use(morgan('dev'));

// ROUTES
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
