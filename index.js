const dotenv = require('dotenv');
dotenv.config();
const {connectDB} = require('./config/db');
const express = require('express')
const app = express();
const cors = require('cors');
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute');
const port = process.env.PORT || 5000

      // connect to database 
connectDB();
      //  middlewares 
app.use(cors());
app.use(express.json());


        //  routes 
app.use('/auth', authRoute);    
app.use('/user', userRoute);    


app.get('/', (req, res) => {
  res.send('Hello World!PyRa is flying....')
})

app.listen(port, () => {
  console.log(`PyRa is flying on port ${port}`)
})