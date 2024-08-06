const express = require('express');
const app=express();
const cors=require('cors');
const userRoutes=require('./routes/user')
const accountRoute=require('./routes/account')
const mainRouter=require('./routes/index')
// const corsOptions = {
//   origin: 'http://localhost:5173',
//   methods: 'GET, POST, PUT, DELETE, OPTIONS',
//   allowedHeaders: 'Content-Type, Authorization'
// };

app.use(cors());
app.use(express.json());
app.use("api/v1",mainRouter);
app.use('/api/v1/account', (req, res, next) => {
    console.log('account route accessed');
    next();
}, accountRoute);
app.use('/api/v1/user', (req, res, next) => {
    console.log('User route accessed');
    next();
}, userRoutes);
app.listen(3000,()=>{
    console.log("listening");
});
// /api/v1/user/signup
// /api/v1/user/signin
// /api/v1/user/changePassword...

// /api/v1/account/transferMoney
// /api/v1/account/balance