// const { errorMonitor } = require('events')
const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware')
const colors = require('colors')
const path = require('path') 


const connectDB = require('./config/database')
connectDB()

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))




app.use('/api/votes', require('./routes/voteRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.use(express.static(path.resolve(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))