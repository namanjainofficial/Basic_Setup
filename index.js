const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { sequelize } =require('./models')

dotenv.config({ path: './.env'})
const app = express();


//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


//connection to port and database
app.listen(process.env.PORT || 5001, async ()=>{
    console.log(`Listen to server connected to PORT ${process.env.PORT || 5001}`);
    await sequelize.authenticate((err) =>{
        console.log(err);
    })
    await sequelize.sync({ force: true })
    console.log('Database connected...')
})