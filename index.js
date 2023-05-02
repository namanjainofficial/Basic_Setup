const { sequelize } =require('./models')
const app = require('./app')
const cloudinary = require("cloudinary");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

//connection to port and database
const server = app.listen(process.env.PORT || 5001, async ()=>{
    console.log(`Listen to server connected to PORT ${process.env.PORT || 5001}`);
    await sequelize.authenticate((err) =>{
        console.log(err);
    })
    await sequelize.sync();
    console.log('Database connected...')
})

//connection to cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });