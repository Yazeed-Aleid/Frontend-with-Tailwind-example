const express =require('express');
let router = express.Router();
// const data = require('../jsonFoulder/data.json')//data
router.use(express.json())//data
const fs = require('fs')



let data = [
    {id:1,title:"HwTitle",description:"HW Des",link:"HW link"}
]



router.get('/getHW' , (req,res)=>{
    res.send(data)
})

//post
router.post('/postData',(req,res)=>{
   
    let newPost = {id:data.length+1,
        title:req.body.data.title,
        description:req.body.data.description,
        link:req.body.data.link}

    data.push(newPost)
    res.send(data)
})


//put
router.put('/putHW/:id',(req,res)=>{
    
    let found = data.find((item)=>{
        return item.id === parseInt(req.params.id)
    })
    if(found){
        let update ={
          
            id:found.id,
            title:req.body.data.title,
            description:req.body.data.description,
            link:req.body.data.link

        }
        let targetIndex = data.indexOf(found)

        data.splice(targetIndex,1,update)
        
        res.send(data)
        fs.writeFile(data,JSON.stringify(data))
    }else{
        res.sendStatus(404)
    }
    

})

//delete
router.delete('/deleteHW/:id',(req,res)=>{
    let found = data.find((item)=>{
        return item.id === parseInt(req.params.id)
    })
    if(found){
        let targetIndex = data.indexOf(found)
        data.splice(targetIndex,1)
        res.send(data)
    }else{
        res.sendStatus(404)
    }
})
 

module.exports=router