const express = require("express")
const sequelize = require("./database/database")
const studentRoutes = require("./routers/studentRoute")
require("dotenv").config()
const app = express()


const PORT = process.env.PORT || 1221
app.use(express.json())

app.use(studentRoutes)

app.use((err, req, res, next)=>{
    if(err instanceof multer.MulterError){
        return res.status(400).json({
            message:err.message
        })
        next()
    }
})

const dbConnect = async()=>{
try {
    await sequelize.authenticate()
    console.log('Database connection Established Successfully')
} catch (error) {
    console.error('Failed to connect to Database', error.message)
}
}
dbConnect()

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`);
    
})