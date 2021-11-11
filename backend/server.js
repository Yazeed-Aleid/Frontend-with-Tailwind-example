const express = require ('express')
const app = express();
const cors = require('cors')
const homework = require('./Router/homework')
const blogs = require('./Router/blog')

app.use(express.json())
app.use(cors())

app.use('/mainHW',homework)
app.use('/mainB',blogs)



app.listen(3001,()=>{
    console.log('Server Done');
})