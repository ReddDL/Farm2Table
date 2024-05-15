import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

//middleware setup
app.use(bodyParser.json()); // parses incoming JSON requests
app.use(cors()); // enable Cross-Origin Resource Sharing

//connect to MongoDB database
mongoose.connect('mongodb://localhost/Farm-to-Table', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//database connection event handling
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// import and mount routers for different endpoints
import adminRouter from './routes/admin.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js'; 
import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';
import salesRouter from './routes/sales.js';

app.use('/api/admin', adminRouter); //mount admin routes
app.use('/api/users', usersRouter); //mount user routes
app.use('/api/auth', authRouter);   //mount authentication routes
app.use('/api/products', productsRouter); //mount product routes
app.use('/api/orders', ordersRouter);     //mount order routes
app.use('/api/sales', salesRouter);       //mount sales routes

// port number
const PORT = process.env.PORT || 3000;

// server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
