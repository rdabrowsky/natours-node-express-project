const express = require('express');
const tourRoutes = require('./routes/tourRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Tour routes

app.use('/api/v1/tours', tourRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
